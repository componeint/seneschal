<?php
/**
 * GroupController.php
 * Created by anonymous on 29/12/15 21:16.
 */

namespace Onderdelen\JwtAuth\Controllers;

use Onderdelen\AppFoundation\Controller\Controller;
use Vinkla\Hashids\HashidsManager;
use Illuminate\Pagination\Paginator;
use Onderdelen\JwtAuth\FormRequests\GroupCreateRequest;
use Onderdelen\JwtAuth\Repositories\Group\GroupRepositoryInterface;
use Onderdelen\JwtAuth\Traits\CerberusRedirectionTrait;
use Onderdelen\JwtAuth\Traits\CerberusViewfinderTrait;
use View;
use Input;
use Redirect;

/**
 * Class GroupController
 * @package Onderdelen\JwtAuth\Controllers
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

        return response()->success($result);
    }

    /**
     * Display the specified group.
     *
     * @param $hash
     * @return \Response
     */
    public function show($hash)
    {
        // Decode the hashid
        // $id = $this->hashids->decode($hash);
        // $id = $hash;

        // Pull the group from storage
        $group = $this->groupRepository->retrieveById($hash);

        // return $this->viewFinder('Cerberus::groups.show', ['group' => $group]);
        return response()->success([$group]);
    }

    /**
     * Show the form for editing the specified group.
     *
     * @param $hash
     * @return \Response
     */
    public function edit($hash)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Pull the group from storage
        $group = $this->groupRepository->retrieveById($id);

        return $this->viewFinder('Cerberus::groups.edit', [
            'group'       => $group,
            'permissions' => $group->getPermissions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $hash
     * @return \Response
     */
    public function update($hash)
    {
        // Gather Input
        $data = Input::all();

        // Decode the hashid
        $data['id'] = $this->hashids->decode($hash)[0];

        // Update the group
        $result = $this->groupRepository->update($data);

        return $this->redirectViaResponse('groups_update', $result);
    }

    /**
     * Remove the specified group from storage.
     *
     * @param $hash
     * @return \Response
     */
    public function destroy($hash)
    {
        // Decode the hashid
        // $id = $this->hashids->decode($hash)[0];

        // Remove the group from storage
        $result = $this->groupRepository->destroy($hash);

        // return $this->redirectViaResponse('groups_destroy', $result);
        return response()->json($result);
    }
}

