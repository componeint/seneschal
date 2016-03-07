<?php
/**
 * GroupController.php
 * Created by anonymous on 29/12/15 21:16.
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

/**
 * Class GroupController
 * @package Componeint\Seneschal\Controllers
 */
class GroupController extends Controller
{
    use SeneschalRedirectionTrait;
    use SeneschalViewfinderTrait;

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
        // $this->middleware('sentry.admin');
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

        // return $this->viewFinder('Seneschal::groups.index', ['groups' => $groups]);

        $groups = $this->groupRepository->all();

        // $result = ['count' => count($groups), 'lists' => $groups];

        return response()->json(['count' => count($groups), 'data' => $groups]);
    }

    /**
     * Show the form for creating a group
     *
     * @return \Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage
     *
     * @param GroupCreateRequest $request
     * @return mixed
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
     * Display the specified group
     *
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        // Pull the group from storage
        $group = $this->groupRepository->retrieveById($id);

        return response()->success([$group]);
    }

    /**
     * Show the form for editing the specified group
     *
     * @param $id
     * @return mixed
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
     * Update the specified resource in storage
     *
     * @param GroupUpdateRequest $request
     * @return mixed
     */
    public function update(GroupUpdateRequest $request)
    {
        // Gather Input
        $data = $request->all();

        // Update the group
        $result = $this->groupRepository->update($data);

        return response()->success([$result]);
    }

    /**
     * Remove the specified group from storage
     *
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        // Remove the group from storage
        $result = $this->groupRepository->destroy($id);

        return response()->success([$result]);
    }
}

