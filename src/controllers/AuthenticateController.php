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
 *
 * @package Onderdelen\JwtAuth\Controllers
 */
class AuthenticateController extends Controller
{
    /**
     * construct
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate', 'signup']]);
    }


    /**
     * Return the user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }


    /**
     * Return a JWT
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(Request $request)
    {
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
    }

    /**
     * Return the authenticated user
     *
     * @return \Illuminate\Http\JsonResponse
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

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    /**
     * Create Email and Password Account.
     */
    public function signup(Request $request)
    {
        /*$validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required|email|unique:email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()], 400);
        }*/

        $user        = new User;
        $user->name  = $request->input('username');
        $user->email = $request->input('email');
        //$user->password = Crypt::encrypt($request->input('password'));
        $user->password = Hash::make($request->input('password'));
        $user->save();

        //return response()->json(['token' => $this->createToken($user)]);

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
    }
}