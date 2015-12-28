<?php
/**
 * Created by anonymous on 28/12/15 16:00.
 */

namespace Onderdelen\JwtAuth\Controllers;

use Illuminate\Pagination\Paginator;
//use Onderdelen\JwtAuth\FormRequests\ChangePasswordRequest;
//use Onderdelen\JwtAuth\FormRequests\UserCreateRequest;
//use Onderdelen\JwtAuth\FormRequests\UserUpdateRequest;
use Onderdelen\JwtAuth\Repositories\Group\GroupRepositoryInterface;
use Onderdelen\JwtAuth\Repositories\User\UserRepositoryInterface;
use Vinkla\Hashids\HashidsManager;
use View;
use Input;
use Event;
use Redirect;
use Session;
use Config;
use Anwendungen\Application\Controller\Controller;

class UserController extends Controller
{
    public function __construct(
        UserRepositoryInterface $userRepository,
        GroupRepositoryInterface $groupRepository,
        HashidsManager $hashids
    ) {
        $this->userRepository  = $userRepository;
        $this->groupRepository = $groupRepository;
        $this->hashids         = $hashids;

        $this->middleware('jwt.auth', ['except' => ['index']]);
    }
    /**
     * Display a paginated index of all current users, with throttle data
     *
     * @return View
     */
    public function index()
    {
        // Paginate the existing users
        //$users       = $this->userRepository->all();
        //$perPage     = 15;
        //$currentPage = Input::get('page') - 1;
        //$pagedData   = array_slice($users, $currentPage * $perPage, $perPage);
        //$users       = new Paginator($pagedData, $perPage, $currentPage);

        //return $this->viewFinder('Sentinel::users.index', ['users' => $users]);

        return response()->json(['records' => $this->userRepository->all()]);
    }

}