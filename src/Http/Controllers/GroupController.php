<?php
/**
 * GroupController.php
 * Created by @anonymoussc on 29/12/15 21:16.
 */

namespace Componeint\Seneschal\Controllers;

use Componeint\AppFoundation\Controller\Controller;
use Vinkla\Hashids\HashidsManager;
use Illuminate\Pagination\Paginator;
use Componeint\Seneschal\FormRequests\GroupCreateRequest;
use Componeint\Seneschal\FormRequests\GroupUpdateRequest;
use Componeint\Seneschal\Repositories\Group\GroupRepositoryInterface;
use Componeint\Seneschal\Traits\SeneschalRedirectionTrait;
use Componeint\Seneschal\Traits\SeneschalViewfinderTrait;
use View;
use Input;
use Redirect;


class GroupController extends Controller
{
    use SeneschalRedirectionTrait;
    use SeneschalViewfinderTrait;

    public function __construct(GroupRepositoryInterface $groupRepository, HashidsManager $hashids)
    {
        $this->groupRepository = $groupRepository;
        $this->hashids         = $hashids;

        // You must have admin access to proceed
        // $this->middleware('sentry.admin');
    }

    public function index()
    {
        // Paginate the existing users
        // $groups      = $this->groupRepository->all();
        // $perPage     = 15;
        // $currentPage = Input::get('page') - 1;
        // $pagedData   = array_slice($groups, $currentPage * $perPage, $perPage);
        // $groups      = new Paginator($pagedData, $perPage, $currentPage);

        // return $this->viewFinder('Seneschal::groups.index', ['groups' => $groups]);

        $groups = $this->groupRepository->all();

        // $result = ['count' => count($groups), 'lists' => $groups];

        return response()->json(['count' => count($groups), 'data' => $groups]);
    }

    public function create()
    {
        //
    }

    public function store(GroupCreateRequest $request)
    {
        $data   = $request->all();
        $result = $this->groupRepository->store($data);

        // return $this->redirectViaResponse('groups_store', $result);
        return response()->success([$result]);
    }

    public function show($id)
    {
        $group = $this->groupRepository->retrieveById($id);

        return response()->success([$group]);
    }

    public function edit($id)
    {
        $group  = $this->groupRepository->retrieveById($id);
        $result = [
            'group'       => $group,
            'permissions' => $group->getPermissions(),
        ];

        return response()->success([$result]);
    }

    public function update(GroupUpdateRequest $request)
    {
        $data   = $request->all();
        $result = $this->groupRepository->update($data);

        return response()->success([$result]);
    }

    public function destroy($id)
    {
        $result = $this->groupRepository->destroy($id);

        return response()->success([$result]);
    }
}
