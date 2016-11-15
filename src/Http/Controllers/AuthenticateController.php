<?php
/**
 * AuthenticateController.php
 * Created by @anonymoussc on 05/12/15 9:00.
 */

namespace Componeint\Seneschal\Controllers;

use Componeint\AppFoundation\Controller\Controller;
use Illuminate\Support\Facades\Response;
use Componeint\Seneschal\FormRequests\LoginRequest;
use Componeint\Seneschal\Repositories\Authenticate\AuthenticateRepositoryInterface;
use Componeint\Seneschal\Traits\SeneschalRedirectionTrait;
use Componeint\Seneschal\Traits\SeneschalViewfinderTrait;
use Componeint\Seneschal\Models\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Sentry;
use View;
use Input;
use Event;
use Redirect;
use Session;
use Config;
use DB;

/**
 * Class AuthenticateController
 * @package Componeint\Seneschal\Controllers
 */
class AuthenticateController extends Controller
{
    use SeneschalRedirectionTrait;
    use SeneschalViewfinderTrait;

    /**
     * Constructor
     *
     * @param AuthenticateRepositoryInterface $authenticateManager
     */
    public function __construct(AuthenticateRepositoryInterface $authenticateManager)
    {
        $this->authenticateManager = $authenticateManager;
        $this->middleware('jwt.auth', ['except' => ['authenticate', 'signup']]);
    }

    /**
     * Return the user
     *
     * @return mixed
     */
    public function index()
    {
        $users = User::all();

        return response()->success([$users]);
    }

    /**
     * Return a JWT
     *
     * @param LoginRequest $request
     * @return mixed
     */
    public function authenticate(LoginRequest $request)
    {
        // Gather the input
        $data = $request->all();

        // Attempt the login
        $result = $this->authenticateManager->store($data);

        // Did it work?
        if ($result->isSuccessful()) {
            $credentials = $request->only('email', 'password');
            try {
                // verify the credentials and create a token for the user
                if (!$token = JWTAuth::attempt($credentials)) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            } catch (JWTException $e) {
                // something went wrong
                return response()->json(['error' => 'could_not_create_token'], 500);
            }

            // if no errors are encountered we can return a JWT
            return response()->json(compact('token'));
        } else {
            return response()->error($result->getMessage(), 400);
        }
    }

    /**
     * Return the authenticated user
     *
     * @return mixed
     */
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        // cleanup later
        // Using eloquent result in three queries instead of one if using query builder
        // select `groups`.`name` from `groups` inner join `users_groups` on `groups`.`id` = `users_groups`.`group_id` inner join `users` on `users`.`id` = `users_groups`.`user_id` where `users`.`id` = 77

        $permissions = DB::table('groups')
            ->join('users_groups', 'groups.id', '=', 'users_groups.group_id')
            ->join('users', 'users.id', '=', 'users_groups.user_id')
            ->select('groups.name')
            ->where('users.id', $user['id'])
            ->get();


        // the token is valid and we have found the user via the sub claim
        return response()->json(['user' => $user, 'permissions' => $permissions]);
    }

    /**
     * Show the login form
     *
     * @return \Response
     */
    public function create()
    {
        //
    }

    /**
     * Attempt authenticate a user
     *
     * @param LoginRequest $request
     * @return mixed
     */
    public function store(LoginRequest $request)
    {
        // Gather the input
        $data = Input::all();

        // Attempt the login
        $result = $this->session->store($data);

        // Did it work?
        if ($result->isSuccessful()) {
            // Login was successful.  Determine where we should go now.
            if (!config('seneschal.views_enabled')) {
                // Views are disabled - return json instead
                return Response::json('success', 200);
            }
            // Views are enabled, so go to the determined route
            $redirect_route = config('seneschal.routing.session_store');

            return Redirect::intended($this->generateUrl($redirect_route));
        } else {
            // There was a problem - unrelated to Form validation.
            if (!config('seneschal.views_enabled')) {
                // Views are disabled - return json instead
                return Response::json($result->getMessage(), 400);
            }
            Session::flash('error', $result->getMessage());

            return Redirect::route('seneschal.session.create')
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage
     *
     * @return \Response
     */
    public function destroy()
    {
        //
    }
}