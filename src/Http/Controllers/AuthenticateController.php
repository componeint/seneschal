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


class AuthenticateController extends Controller
{
    use SeneschalRedirectionTrait;
    use SeneschalViewfinderTrait;

    public function __construct(AuthenticateRepositoryInterface $authenticateManager)
    {
        $this->authenticateManager = $authenticateManager;
        $this->middleware('jwt.auth', ['except' => ['authenticate', 'signup']]);
    }

    public function index()
    {
        $users = User::all();

        return response()->success([$users]);
    }

    public function authenticate(LoginRequest $request)
    {
        $data   = $request->all();
        $result = $this->authenticateManager->store($data);

        if ($result->isSuccessful()) {
            $credentials = $request->only('email', 'password');
            try {
                if (!$token = JWTAuth::attempt($credentials)) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }

            return response()->json(compact('token'));
        } else {
            return response()->error($result->getMessage(), 400);
        }
    }

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

    public function create()
    {
        //
    }

    public function store(LoginRequest $request)
    {
        $data = Input::all();

        $result = $this->session->store($data);

        if ($result->isSuccessful()) {
            if (!config('seneschal.views_enabled')) {
                return Response::json('success', 200);
            }
            $redirect_route = config('seneschal.routing.session_store');

            return Redirect::intended($this->generateUrl($redirect_route));
        } else {
            if (!config('seneschal.views_enabled')) {
                return Response::json($result->getMessage(), 400);
            }
            Session::flash('error', $result->getMessage());

            return Redirect::route('seneschal.session.create')->withInput();
        }
    }

    public function destroy()
    {
        //
    }
}
