<?php
/**
 * Created by anonymous on 05/12/15 9:00.
 */

namespace Onderdelen\JwtAuth\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Hash;
use Anwendungen\Application\Controller\Controller;
use Onderdelen\JwtAuth\Models\User;

/**
 * Class AuthenticateController
 * @package Onderdelen\JwtAuth\Controllers
 */
class AuthenticateController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $users = User::all();

        return response()->success($users);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->error('invalid_credentials', 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->error('could_not_create_token', 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->success(compact('token'));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->error('token_expired', $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->error('token_invalid', $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->error('token_absent', $e->getStatusCode());
        }

        // the token is valid and we have found the user via the sub claim
        return response()->success(compact('user'));
    }
}

