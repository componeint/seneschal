<?php
/**
 * RegistrationController.php
 * Created by @anonymoussc on 17/12/15 16:34.
 */

namespace Componeint\Seneschal\Controllers;

use Componeint\AppFoundation\Controller\Controller;
use Vinkla\Hashids\HashidsManager;
use Componeint\Seneschal\FormRequests\RegisterRequest;
use Componeint\Seneschal\FormRequests\EmailRequest;
use Componeint\Seneschal\FormRequests\ResetPasswordRequest;
use Componeint\Seneschal\Repositories\Group\GroupRepositoryInterface;
use Componeint\Seneschal\Repositories\User\UserRepositoryInterface;
use Componeint\Seneschal\Traits\SeneschalRedirectionTrait;
use Componeint\Seneschal\Traits\SeneschalViewfinderTrait;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Sentry;
use View;
use Input;
use Event;
use Redirect;
use Session;
use Config;

class RegistrationController extends Controller
{
    use SeneschalRedirectionTrait;
    use SeneschalViewfinderTrait;

    public function __construct(UserRepositoryInterface $userRepository, GroupRepositoryInterface $groupRepository, HashidsManager $hashids)
    {
        $this->userRepository  = $userRepository;
        $this->groupRepository = $groupRepository;
        $this->hashids         = $hashids;

        // Check CSRF token on POST
        // $this->beforeFilter('Seneschal\csrf', array('on' => array('post', 'put', 'delete')));

        // $this->middleware('jwt.auth', ['except' => ['register']]);
    }

    public function registration()
    {
        if (Sentry::check()) {
            return $this->redirectTo('session_store');
        }

        if (!config('seneschal.registration', false)) {
            return $this->redirectTo(['route' => 'home'], ['error' => trans('Seneschal::users.inactive_reg')]);
        }

        return $this->viewFinder('Seneschal::users.register');
    }

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

    public function activate($hash, $code)
    {
        $id     = $this->hashids->decode($hash)[0];
        $result = $this->userRepository->activate($id, $code);

        return $this->redirectViaResponse('registration_activated', $result);
    }

    public function resendActivationForm()
    {
        // return $this->viewFinder('Seneschal::users.resend');
    }

    public function resendActivation(EmailRequest $request)
    {
        $result = $this->userRepository->resend(['email' => e($request->get('email'))]);

        // return $this->redirectViaResponse('registration_resend', $result);
        return response()->success([$result]);
    }

    public function forgotPasswordForm()
    {
        return $this->viewFinder('Seneschal::users.forgot');
    }

    public function sendResetPasswordEmail(EmailRequest $request)
    {
        $result = $this->userRepository->triggerPasswordReset(e($request->get('email')));

        // return $this->redirectViaResponse('registration_reset_triggered', $result);
        return response()->success([$result]);
    }

    public function passwordResetForm($hash, $code)
    {
        $id     = $this->hashids->decode($hash)[0];
        $result = $this->userRepository->validateResetCode($id, $code);

        if (!$result->isSuccessful()) {
            // return $this->redirectViaResponse('registration_reset_invalid', $result);
            response()->fail('', '', [$result]);
        }

        /*
        return $this->viewFinder('Seneschal::users.reset', [
            'hash' => $hash,
            'code' => $code,
        ]);
        */

        return response()->success([$result]);
    }

    public function resetPassword(ResetPasswordRequest $request, $hash, $code)
    {
        $id     = $this->hashids->decode($hash)[0];
        $data   = Input::only('password', 'password_confirmation');
        $result = $this->userRepository->resetPassword($id, $code, e($data['password']));

        // return $this->redirectViaResponse('registration_reset_complete', $result);
        return response()->success([$result]);
    }
}
