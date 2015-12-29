<?php
/**
 * Created by anonymous on 29/12/15 21:16.
 */

namespace Onderdelen\JwtAuth\Controllers;

use Vinkla\Hashids\HashidsManager;
use Illuminate\Pagination\Paginator;
//use Sentinel\FormRequests\GroupCreateRequest;
use Onderdelen\JwtAuth\Repositories\Group\GroupRepositoryInterface;
use View;
use Input;
use Redirect;
use Anwendungen\Application\Controller\Controller;

class GroupController extends Controller
{
    /**
     * Constructor
     */
    public function __construct(
        GroupRepositoryInterface $groupRepository,
        HashidsManager $hashids
    ) {
        $this->groupRepository = $groupRepository;
        $this->hashids         = $hashids;

        // You must have admin access to proceed
        //$this->middleware('sentry.admin');
    }

    /**
     * Display a paginated list of all current groups
     *
     * @return View
     */
    public function index()
    {
        // Paginate the existing users
//        $groups      = $this->groupRepository->all();
//        $perPage     = 15;
//        $currentPage = Input::get('page') - 1;
//        $pagedData   = array_slice($groups, $currentPage * $perPage, $perPage);
//        $groups      = new Paginator($pagedData, $perPage, $currentPage);
//
//        return $this->viewFinder('Sentinel::groups.index', ['groups' => $groups]);

        return response()->json(['records' => $this->groupRepository->all()]);
    }

}