<?php
/**
 * Created by anonymous on 28/12/15 16:00.
 */

namespace Onderdelen\JwtAuth\Controllers;


class UserController
{
    /**
     * Display a paginated index of all current users, with throttle data
     *
     * @return View
     */
    public function index()
    {
        // Paginate the existing users
        $users       = $this->userRepository->all();
        $perPage     = 15;
        $currentPage = Input::get('page') - 1;
        $pagedData   = array_slice($users, $currentPage * $perPage, $perPage);
        $users       = new Paginator($pagedData, $perPage, $currentPage);

        return $this->viewFinder('Sentinel::users.index', ['users' => $users]);
    }

}