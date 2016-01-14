<?php
/**
 * ProfileController.php
 * Created by anonymous on 14/01/16 8:25.
 */

namespace Onderdelen\JwtAuth\Controllers;

use Anwendungen\Application\Controller\Controller;
use Onderdelen\JwtAuth\FormRequests\ChangePasswordRequest;
use Onderdelen\JwtAuth\FormRequests\UserUpdateRequest;
use Onderdelen\JwtAuth\Repositories\Group\GroupRepositoryInterface;
use Onderdelen\JwtAuth\Repositories\User\UserRepositoryInterface;
use Cerberus\Traits\CerberusRedirectionTrait;
use Cerberus\Traits\CerberusViewfinderTrait;
use Session;
use Input;
use Response;
use Redirect;

/**
 * Class ProfileController
 * @package Onderdelen\JwtAuth\Controllers
 */
class ProfileController extends Controller
{
    use CerberusRedirectionTrait;
    use CerberusViewfinderTrait;

    /**
     * @param UserRepositoryInterface  $userRepository
     * @param GroupRepositoryInterface $groupRepository
     */
    public function __construct(
        UserRepositoryInterface $userRepository,
        GroupRepositoryInterface $groupRepository
    ) {
        // DI Member assignment
        $this->userRepository  = $userRepository;
        $this->groupRepository = $groupRepository;

        // You must have an active session to proceed
        // $this->middleware('sentry.auth');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show()
    {
        // Grab the current user
        $user = $this->userRepository->getUser();

        return $this->viewFinder('Cerberus::users.show', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit()
    {
        // Grab the current user
        $user = $this->userRepository->getUser();

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
     * @return Response
     */
    public function update(UserUpdateRequest $request)
    {
        // Gather Input
        $data       = Input::all();
        $data['id'] = $this->userRepository->getUser()->id;

        // Attempt to update the user
        $result = $this->userRepository->update($data);

        // Done!
        return $this->redirectViaResponse('profile_update', $result);
    }

    /**
     * Process a password change request
     *
     * @return Redirect
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        // Grab the current user
        $user = $this->userRepository->getUser();

        // Gather input
        $data       = Input::all();
        $data['id'] = $user->id;

        // Change the User's password
        $result = ($user->hasAccess('admin') ? $this->userRepository->changePasswordWithoutCheck($data) : $this->userRepository->changePassword($data));

        // Was the change successful?
        if (!$result->isSuccessful()) {
            Session::flash('error', $result->getMessage());

            return Redirect::back();
        }

        return $this->redirectViaResponse('profile_change_password', $result);
    }
}