<?php
/**
 * GroupController.php
 * Created by anonymous on 29/12/15 21:16.
 */

namespace Onderdelen\Seneschal\Controllers;

use Onderdelen\AppFoundation\Controller\Controller;
use Vinkla\Hashids\HashidsManager;
use Illuminate\Pagination\Paginator;
use Onderdelen\Seneschal\FormRequests\GroupCreateRequest;
use Onderdelen\Seneschal\FormRequests\GroupUpdateRequest;
use Onderdelen\Seneschal\Repositories\Group\GroupRepositoryInterface;
use Onderdelen\Seneschal\Traits\CerberusRedirectionTrait;
use Onderdelen\Seneschal\Traits\CerberusViewfinderTrait;
use View;
use Input;
use Redirect;

/**
 * Class GroupController
 * @package Onderdelen\Seneschal\Controllers
 */
class GroupController extends Controller
{
    use CerberusRedirectionTrait;
    use CerberusViewfinderTrait;

    /**
     * Constructor
     *
     * @param GroupRepositoryInterface $groupRepository
     * @param HashidsManager           $hashids
     */
    public function __construct(
        GroupRepositoryInterface $groupRepository,
        HashidsManager $hashids
    ) {
        $this->groupRepository = $groupRepository;
        $this->hashids         = $hashids;

        // You must have admin access to proceed
        // $this->middleware('carbuncle.admin');
    }

    /**
     * Display a paginated list of all current groups
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Paginate the existing users
        // $groups      = $this->groupRepository->all();
        // $perPage     = 15;
        // $currentPage = Input::get('page') - 1;
        // $pagedData   = array_slice($groups, $currentPage * $perPage, $perPage);
        // $groups      = new Paginator($pagedData, $perPage, $currentPage);

        // return $this->viewFinder('Cerberus::groups.index', ['groups' => $groups]);

        $groups = $this->groupRepository->all();

        // $result = ['count' => count($groups), 'lists' => $groups];

        return response()->json(['count' => count($groups), 'data' => $groups]);
    }

    /**
     * Show the form for creating a group.
     *
     * @return \Response
     */
    public function create()
    {
        return $this->viewFinder('Cerberus::groups.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param GroupCreateRequest $request
     * @return \Response
     */
    public function store(GroupCreateRequest $request)
    {
        // Gather input
        $data = $request->all();

        // Store the new group
        $result = $this->groupRepository->store($data);

        // return $this->redirectViaResponse('groups_store', $result);
        return response()->success([$result]);
    }

    /**
     * Display the specified group.
     *
     * @param $id
     * @return \Response
     */
    public function show($id)
    {
        // Pull the group from storage
        $group = $this->groupRepository->retrieveById($id);

        // return $this->viewFinder('Cerberus::groups.show', ['group' => $group]);
        return response()->success([$group]);
    }

    /**
     * Show the form for editing the specified group.
     *
     * @param $id
     * @return \Response
     */
    public function edit($id)
    {
        // Pull the group from storage
        $group = $this->groupRepository->retrieveById($id);

        $result = [
            'group'       => $group,
            'permissions' => $group->getPermissions(),
        ];

        return response()->success([$result]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param GroupUpdateRequest $request
     * @return \Response
     */
    public function update(GroupUpdateRequest $request)
    {
        // Gather Input
        $data = $request->all();

        // Update the group
        $result = $this->groupRepository->update($data);

        // return $this->redirectViaResponse('groups_update', $result);
        return response()->success([$result]);
    }

    /**
     * Remove the specified group from storage.
     *
     * @param $id
     * @return \Response
     */
    public function destroy($id)
    {
        // Remove the group from storage
        $result = $this->groupRepository->destroy($id);

        // return $this->redirectViaResponse('groups_destroy', $result);
        return response()->success([$result]);
    }
}

