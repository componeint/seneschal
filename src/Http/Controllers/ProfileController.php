<?php
/**
 * ProfileController.php
 * Created by @anonymoussc on 14/01/16 8:25.
 */

namespace Componeint\Seneschal\Controllers;

use Componeint\AppFoundation\Controller\Controller;
use Componeint\Seneschal\FormRequests\ChangePasswordRequest;
use Componeint\Seneschal\FormRequests\UserUpdateRequest;
use Componeint\Seneschal\Repositories\Group\GroupRepositoryInterface;
use Componeint\Seneschal\Repositories\User\UserRepositoryInterface;
use Componeint\Seneschal\Traits\SeneschalRedirectionTrait;
use Componeint\Seneschal\Traits\SeneschalViewfinderTrait;
use Session;
use Input;
use Response;
use Redirect;

/**
 * Class ProfileController
 * @package Componeint\Seneschal\Controllers
 */
class ProfileController extends Controller
{
    use SeneschalRedirectionTrait;
    use SeneschalViewfinderTrait;

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
     * Display the specified resource
     *
     * @return Response
     */
    public function show()
    {
        // Grab the current user
        $user = $this->userRepository->getUser();

        return $this->viewFinder('Seneschal::users.show', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource
     *
     * @return Response
     */
    public function edit()
    {
        // Grab the current user
        $user = $this->userRepository->getUser();

        // Get all available groups
        $groups = $this->groupRepository->all();

        return $this->viewFinder('Seneschal::users.edit', [
            'user'   => $user,
            'groups' => $groups,
        ]);
    }

    /**
     * Update the specified resource in storage
     *
     * @param UserUpdateRequest $request
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
     * @param ChangePasswordRequest $request
     * @return Response
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