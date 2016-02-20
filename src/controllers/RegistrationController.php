<?php
/**
 * RegistrationController.php
 * Created by anonymous on 17/12/15 16:34.
 */

namespace Onderdelen\Seneschal\Controllers;

use Onderdelen\AppFoundation\Controller\Controller;
use Vinkla\Hashids\HashidsManager;
use Onderdelen\Seneschal\FormRequests\RegisterRequest;
use Onderdelen\Seneschal\FormRequests\EmailRequest;
use Onderdelen\Seneschal\FormRequests\ResetPasswordRequest;
use Onderdelen\Seneschal\Repositories\Group\GroupRepositoryInterface;
use Onderdelen\Seneschal\Repositories\User\UserRepositoryInterface;
use Onderdelen\Seneschal\Traits\CerberusRedirectionTrait;
use Onderdelen\Seneschal\Traits\CerberusViewfinderTrait;
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
 * Class RegistrationController
 * @package Onderdelen\Seneschal\Controllers
 */
class RegistrationController extends Controller
{
    use CerberusRedirectionTrait;
    use CerberusViewfinderTrait;

    /**
     * @param UserRepositoryInterface  $userRepository
     * @param GroupRepositoryInterface $groupRepository
     * @param HashidsManager           $hashids
     */
    public function __construct(
        UserRepositoryInterface $userRepository,
        GroupRepositoryInterface $groupRepository,
        HashidsManager $hashids
    ) {
        $this->userRepository  = $userRepository;
        $this->groupRepository = $groupRepository;
        $this->hashids         = $hashids;

        // Check CSRF token on POST
        // $this->beforeFilter('Cerberus\csrf', array('on' => array('post', 'put', 'delete')));

        // $this->middleware('jwt.auth', ['except' => ['register']]);
    }

    /**
     * Show the registration form, if registration is allowed
     *
     * @return Response
     */
    public function registration()
    {
        // Is this user already signed in? If so redirect to the post login route
        if (Carbuncle::check()) {
            return $this->redirectTo('session_store');
        }

        //If registration is currently disabled, show a message and redirect home.
        if (!config('cerberus.registration', false)) {
            return $this->redirectTo(['route' => 'home'], ['error' => trans('Cerberus::users.inactive_reg')]);
        }

        // All clear - show the registration form.
        return $this->viewFinder('Cerberus::users.register');
    }

    /**
     * Process a registration request.
     *
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        // Gather input
        // $data = Input::all();

        // Attempt Registration
        // $result = $this->userRepository->store($data);

        // It worked!  Use config to determine where we should go.
        // return $this->redirectViaResponse('registration_complete', $result);

        // Gather input and data validation
        $data = $request->all();

        // Attempt Registration
        $result = $this->userRepository->store($data);

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
     * Activate a new user
     *
     * @param  int    $id
     * @param  string $code
     *
     * @return Response
     */
    public function activate($hash, $code)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Attempt the activation
        $result = $this->userRepository->activate($id, $code);

        // It worked!  Use config to determine where we should go.
        return $this->redirectViaResponse('registration_activated', $result);
    }

    /**
     * Show the 'Resend Activation' form
     *
     * @return View
     */
    public function resendActivationForm()
    {
        return $this->viewFinder('Cerberus::users.resend');
    }

    /**
     * Process resend activation request
     * @return Response
     */
    public function resendActivation(EmailRequest $request)
    {
        // Resend the activation email
        $result = $this->userRepository->resend(['email' => e(Input::get('email'))]);

        // It worked!  Use config to determine where we should go.
        return $this->redirectViaResponse('registration_resend', $result);
    }

    /**
     * Display the "Forgot Password" form
     *
     * @return \Illuminate\View\View
     */
    public function forgotPasswordForm()
    {
        return $this->viewFinder('Cerberus::users.forgot');
    }


    /**
     * Process Forgot Password request
     * @return Response
     */
    public function sendResetPasswordEmail(EmailRequest $request)
    {
        // Send Password Reset Email
        $result = $this->userRepository->triggerPasswordReset(e(Input::get('email')));

        // It worked!  Use config to determine where we should go.
        return $this->redirectViaResponse('registration_reset_triggered', $result);
    }

    /**
     * A user is attempting to reset their password
     *
     * @param $id
     * @param $code
     *
     * @return Redirect|View
     */
    public function passwordResetForm($hash, $code)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Validate Reset Code
        $result = $this->userRepository->validateResetCode($id, $code);

        if (!$result->isSuccessful()) {
            return $this->redirectViaResponse('registration_reset_invalid', $result);
        }

        return $this->viewFinder('Cerberus::users.reset', [
            'hash' => $hash,
            'code' => $code,
        ]);
    }

    /**
     * Process a password reset form submission
     *
     * @param $hash
     * @param $code
     * @return Response
     */
    public function resetPassword(ResetPasswordRequest $request, $hash, $code)
    {
        // Decode the hashid
        $id = $this->hashids->decode($hash)[0];

        // Gather input data
        $data = Input::only('password', 'password_confirmation');

        // Change the user's password
        $result = $this->userRepository->resetPassword($id, $code, e($data['password']));

        // It worked!  Use config to determine where we should go.
        return $this->redirectViaResponse('registration_reset_complete', $result);
    }
}