<?php
/**
 * UserController.php
 * Created by anonymous on 28/12/15 16:00.
 */

namespace Onderdelen\JwtAuth\Controllers;

use Onderdelen\AppFoundation\Controller\Controller;
use Illuminate\Pagination\Paginator;
use Onderdelen\JwtAuth\FormRequests\ChangePasswordRequest;
use Onderdelen\JwtAuth\FormRequests\UserCreateRequest;
use Onderdelen\JwtAuth\FormRequests\UserUpdateRequest;
use Onderdelen\JwtAuth\Repositories\Group\GroupRepositoryInterface;
use Onderdelen\JwtAuth\Repositories\User\UserRepositoryInterface;
use Onderdelen\JwtAuth\Traits\CerberusRedirectionTrait;
use Onderdelen\JwtAuth\Traits\CerberusViewfinderTrait;
use Vinkla\Hashids\HashidsManager;
use View;
use Input;
use Event;
use Redirect;
use Session;
use Config;

class UserController extends Controller
{
    use CerberusRedirectionTrait;
    use CerberusViewfinderTrait;

    /**
     * Constructor
     */
    public function __construct(
        UserRepositoryInterface $userRepository,
        GroupRepositoryInterface $groupRepository,
        HashidsManager $hashids
    ) {
        $this->userRepository  = $userRepository;
        $this->groupRepository = $groupRepository;
        $this->hashids         = $hashids;

        // You must have admin access to proceed
        // $this->middleware('sentry.admin');

        // $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
    }

    /**
     * Display a paginated index of all current users, with throttle data
     *
     * @return View
     */
    public function index()
    {
        // Paginate the existing users
        // $users       = $this->userRepository->all();
        // $perPage     = 15;
        // $currentPage = Input::get('page') - 1;
        // $pagedData   = array_slice($users, $currentPage * $perPage, $perPage);
        // $users       = new Paginator($pagedData, $perPage, $currentPage);

        // return $this->viewFinder('Cerberus::users.index', ['users' => $users]);

        $users = $this->userRepository->all();

        return response()->json(['count' => count($users), 'data' => $users]);
    }


    /**
     * Show the "Create new User" form
     *
     * @return View
     */
    public function create()
    {
        return $this->viewFinder('Cerberus::users.create');
    }

    /**
     * Create a new user account manually
     *
     * @return Redirect
     */
    public function store(UserCreateRequest $request)
    {
        // Create and store the new user
        $result = $this->userRepository->store($request->all());

        // Determine response message based on whether or not the user was activated
        $message = ($result->getPayload()['activated'] ? trans('Cerberus::users.addedactive') : trans('Cerberus::users.added'));

        // Finished!
        // return $this->redirectTo('users_store', ['success' => $message]);
        return response()->success(['message' => $message]);
    }


    /**
     * Show the profile of a specific user account
     *
     * @param $hash
     *
     * @return View
     */
    public function show($hash)
    {
        // Decode the hashid
        // $id = $this->hashids->decode($hash)[0];

        // Get the user
        $user = $this->userRepository->retrieveById($hash);

        // return $this->viewFinder('Cerberus::users.show', ['user' => $user]);
        return response()->success([$user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string $hash
     *
     * @return Redirect
     */
    public function edit($hash)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Get the user
        $user = $this->userRepository->retrieveById($id);

        // Get all available groups
        $groups = $this->groupRepository->all();

        return $this->viewFinder('Cerberus::users.edit', [
            'user'   => $user,
            'groups' => $groups,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  string $hash
     *
     * @return Redirect
     */
    public function update(UserUpdateRequest $request, $hash)
    {
        // Gather Input
        $data = Input::all();

        // Decode the hashid
        $data['id'] = $this->hashids->decode($hash)[0];

        // Attempt to update the user
        $result = $this->userRepository->update($data);

        // Done!
        return $this->redirectViaResponse('users_update', $result);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  string $hash
     *
     * @return Redirect
     */
    public function destroy($hash)
    {
        // Decode the hashid
        // $id = $this->hashids->decode($hash)[0];

        // Remove the user from storage
        $result = $this->userRepository->destroy($hash);

        // return $this->redirectViaResponse('users_destroy', $result);
        return response()->success($result);
    }

    /**
     * Change the group memberships for a given user
     *
     * @param $hash
     *
     * @return Redirect
     */
    public function updateGroupMemberships($hash)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Gather input
        $groups = Input::get('groups');

        // Change memberships
        $result = $this->userRepository->changeGroupMemberships($id, $groups);

        // Done
        return $this->redirectViaResponse('users_change_memberships', $result);
    }

    /**
     * Process a password change request
     *
     * @param  string $hash
     *
     * @return redirect
     */
    public function changePassword(ChangePasswordRequest $request, $hash)
    {
        // Gather input
        $data       = Input::all();
        $data['id'] = $this->hashids->decode($hash)[0];

        // Grab the current user
        $user = $this->userRepository->getUser();

        // Change the User's password
        $result = ($user->hasAccess('admin') ? $this->userRepository->changePasswordWithoutCheck($data) : $this->userRepository->changePassword($data));

        // Was the change successful?
        if (!$result->isSuccessful()) {
            Session::flash('error', $result->getMessage());

            return Redirect::back();
        }

        return $this->redirectViaResponse('users_change_password', $result);
    }

    /**
     * Process a suspend user request
     *
     * @param  string $hash
     *
     * @return Redirect
     */
    public function suspend($hash)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Trigger the suspension
        $result = $this->userRepository->suspend($id);

        return $this->redirectViaResponse('users_suspend', $result);
    }

    /**
     * Unsuspend user
     *
     * @param  string $hash
     *
     * @return Redirect
     */
    public function unsuspend($hash)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Trigger the unsuspension
        $result = $this->userRepository->unsuspend($id);

        return $this->redirectViaResponse('users_unsuspend', $result);
    }

    /**
     * Ban a user
     *
     * @param  string $hash
     *
     * @return Redirect
     */
    public function ban($hash)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Ban the user
        $result = $this->userRepository->ban($id);

        return $this->redirectViaResponse('users_ban', $result);
    }

    /**
     * Unban a user
     *
     * @param string $hash
     *
     * @return Redirect
     */
    public function unban($hash)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Unban the user
        $result = $this->userRepository->unban($id);

        return $this->redirectViaResponse('users_unban', $result);
    }
}