<?php
/**
 * AuthenticateController.php
 * Created by anonymous on 05/12/15 9:00.
 */

namespace Onderdelen\JwtAuth\Controllers;

use Onderdelen\AppFoundation\Controller\Controller;
use Illuminate\Support\Facades\Response;
use Onderdelen\JwtAuth\FormRequests\LoginRequest;
use Onderdelen\JwtAuth\Repositories\Authenticate\AuthenticateRepositoryInterface;
use Cerberus\Traits\CerberusRedirectionTrait;
use Cerberus\Traits\CerberusViewfinderTrait;
use Onderdelen\JwtAuth\Models\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Carbuncle;
use View;
use Input;
use Event;
use Redirect;
use Session;
use Config;

/**
 * Class AuthenticateController
 * @package Onderdelen\JwtAuth\Controllers
 */
class AuthenticateController extends Controller
{
    use CerberusRedirectionTrait;
    use CerberusViewfinderTrait;

    /**
     * Constructor
     */
    public function __construct(AuthenticateRepositoryInterface $authenticateManager)
    {
        $this->authenticateManager = $authenticateManager;
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

        return response()->success($users);
    }

    /**
     * Return a JWT
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(LoginRequest $request)
    {
        // Gather the input
        // $data = Input::all();
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
     * Show the login form
     */
    public function create()
    {
        // Is this user already signed in?
        if (Carbuncle::check()) {
            return $this->redirectTo('session_store');
        }

        // No - they are not signed in.  Show the login form.
        return $this->viewFinder('Cerberus::sessions.login');
    }

    /**
     * Attempt authenticate a user.
     *
     * @return Response
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
            if (!config('cerberus.views_enabled')) {
                // Views are disabled - return json instead
                return Response::json('success', 200);
            }
            // Views are enabled, so go to the determined route
            $redirect_route = config('cerberus.routing.session_store');

            return Redirect::intended($this->generateUrl($redirect_route));
        } else {
            // There was a problem - unrelated to Form validation.
            if (!config('cerberus.views_enabled')) {
                // Views are disabled - return json instead
                return Response::json($result->getMessage(), 400);
            }
            Session::flash('error', $result->getMessage());

            return Redirect::route('cerberus.session.create')
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Response
     */
    public function destroy()
    {
        $this->session->destroy();

        return $this->redirectTo('session_destroy');
    }
}