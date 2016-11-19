<?php
/**
 * UserController.php
 * Created by @anonymoussc on 28/12/15 16:00.
 */

namespace Componeint\Seneschal\Controllers;

use Componeint\AppFoundation\Controller\Controller;
use Illuminate\Pagination\Paginator;
use Componeint\Seneschal\FormRequests\ChangePasswordRequest;
use Componeint\Seneschal\FormRequests\UserCreateRequest;
use Componeint\Seneschal\FormRequests\UserUpdateRequest;
use Componeint\Seneschal\Repositories\Group\GroupRepositoryInterface;
use Componeint\Seneschal\Repositories\User\UserRepositoryInterface;
use Componeint\Seneschal\Traits\SeneschalRedirectionTrait;
use Componeint\Seneschal\Traits\SeneschalViewfinderTrait;
use Vinkla\Hashids\HashidsManager;
use DB;
use View;
use Input;
use Event;
use Redirect;
use Session;
use Config;


class UserController extends Controller
{
    use SeneschalRedirectionTrait;
    use SeneschalViewfinderTrait;

    public function __construct(UserRepositoryInterface $userRepository, GroupRepositoryInterface $groupRepository, HashidsManager $hashids)
    {
        $this->userRepository  = $userRepository;
        $this->groupRepository = $groupRepository;
        $this->hashids         = $hashids;

        // You must have admin access to proceed
        // $this->middleware('sentry.admin');

        // $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        // Paginate the existing users
        // $users       = $this->userRepository->all();
        // $perPage     = 15;
        // $currentPage = Input::get('page') - 1;
        // $pagedData   = array_slice($users, $currentPage * $perPage, $perPage);
        // $users       = new Paginator($pagedData, $perPage, $currentPage);

        // return $this->viewFinder('Seneschal::users.index', ['users' => $users]);

        $users = $this->userRepository->all();

        return response()->json(['count' => count($users), 'data' => $users]);
    }

    public function create()
    {
        return $this->viewFinder('Seneschal::users.create');
    }

    public function store(UserCreateRequest $request)
    {
        $result  = $this->userRepository->store($request->all());
        $message = ($result->getPayload()['activated'] ? trans('Seneschal::users.addedactive') : trans('Seneschal::users.added'));

        // return $this->redirectTo('users_store', ['success' => $message]);
        return response()->success(['message' => $message]);
    }

    public function show($id)
    {
        $user = $this->userRepository->retrieveById($id);

        // return $this->viewFinder('Seneschal::users.show', ['user' => $user]);
        return response()->success([$user]);
    }

    public function edit($id)
    {
        $user        = $this->userRepository->retrieveById($id);
        $groups      = $this->groupRepository->all();
        $permissions = DB::table('groups')
            ->join('users_groups', 'groups.id', '=', 'users_groups.group_id')
            ->join('users', 'users.id', '=', 'users_groups.user_id')
            ->select('groups.name')
            ->where('users.id', $user['id'])
            ->get();

        $result = [
            'user'        => $user,
            'groups'      => $groups,
            'permissions' => $permissions,
        ];

        /*
        return $this->viewFinder('Seneschal::users.edit', [
            'user'   => $user,
            'groups' => $groups,
        ]);
        */

        return response()->success([$result]);
    }

    public function update(UserUpdateRequest $request)
    {
        $data   = $request->all();
        $result = $this->userRepository->update($data);

        // return $this->redirectViaResponse('users_update', $result);
        return response()->success([$result]);
    }

    public function destroy($id)
    {
        $result = $this->userRepository->destroy($id);

        // return $this->redirectViaResponse('users_destroy', $result);
        return response()->success([$result]);
    }

    public function updateGroupMemberships()
    {
        $data   = Input::All();
        $result = $this->userRepository->changeGroupMemberships($data['id'], $data['groups']);

        // return $this->redirectViaResponse('users_change_memberships', $result);
        return response()->success([$result]);
    }

    public function changePassword(ChangePasswordRequest $request, $id)
    {
        $data = Input::all();
        // $data['id'] = $this->hashids->decode($id)[0];

        $user   = $this->userRepository->getUser();
        $result = ($user->hasAccess('admin') ? $this->userRepository->changePasswordWithoutCheck($data) : $this->userRepository->changePassword($data));

        if (!$result->isSuccessful()) {
            Session::flash('error', $result->getMessage());

            return Redirect::back();
        }

        return $this->redirectViaResponse('users_change_password', $result);
    }

    public function suspend($id)
    {
        $result = $this->userRepository->suspend($id);

        // return $this->redirectViaResponse('users_suspend', $result);
        return response()->success([$result]);
    }

    public function unsuspend($id)
    {
        $result = $this->userRepository->unsuspend($id);

        // return $this->redirectViaResponse('users_unsuspend', $result);
        return response()->success([$result]);
    }

    public function ban($id)
    {
        $result = $this->userRepository->ban($id);

        // return $this->redirectViaResponse('users_ban', $result);
        return response()->success([$result]);
    }

    public function unban($id)
    {
        $result = $this->userRepository->unban($id);

        // return $this->redirectViaResponse('users_unban', $result);
        return response()->success([$result]);
    }
}
