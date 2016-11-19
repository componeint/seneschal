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


class ProfileController extends Controller
{
    use SeneschalRedirectionTrait;
    use SeneschalViewfinderTrait;

    public function __construct(UserRepositoryInterface $userRepository, GroupRepositoryInterface $groupRepository)
    {
        $this->userRepository  = $userRepository;
        $this->groupRepository = $groupRepository;

        // You must have an active session to proceed
        // $this->middleware('sentry.auth');
    }

    public function show()
    {
        $user = $this->userRepository->getUser();

        return $this->viewFinder('Seneschal::users.show', ['user' => $user]);
    }

    public function edit()
    {
        $user   = $this->userRepository->getUser();
        $groups = $this->groupRepository->all();

        return $this->viewFinder('Seneschal::users.edit', [
            'user'   => $user,
            'groups' => $groups,
        ]);
    }

    public function update(UserUpdateRequest $request)
    {
        $data       = Input::all();
        $data['id'] = $this->userRepository->getUser()->id;
        $result     = $this->userRepository->update($data);

        return $this->redirectViaResponse('profile_update', $result);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user       = $this->userRepository->getUser();
        $data       = Input::all();
        $data['id'] = $user->id;
        $result     = ($user->hasAccess('admin') ? $this->userRepository->changePasswordWithoutCheck($data) : $this->userRepository->changePassword($data));

        if (!$result->isSuccessful()) {
            Session::flash('error', $result->getMessage());

            return Redirect::back();
        }

        return $this->redirectViaResponse('profile_change_password', $result);
    }
}
