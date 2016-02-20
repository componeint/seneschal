<?php
/**
 * AuthenticateRepository.php
 * Created by anonymous on 05/01/16 16:36.
 */

namespace Onderdelen\Seneschal\Repositories\Authenticate;

use Config;
use Illuminate\Events\Dispatcher;
use Einherjars\Carbuncle\Carbuncle;
use Einherjars\Carbuncle\Throttling\UserBannedException;
use Einherjars\Carbuncle\Throttling\UserSuspendedException;
use Einherjars\Carbuncle\Users\UserNotActivatedException;
use Einherjars\Carbuncle\Users\UserNotFoundException;
use Einherjars\Carbuncle\Users\LoginRequiredException;
use Einherjars\Carbuncle\Users\PasswordRequiredException;
use Einherjars\Carbuncle\Users\WrongPasswordException;
use Onderdelen\Seneschal\DataTransferObjects\BaseResponse;
use Onderdelen\Seneschal\DataTransferObjects\ExceptionResponse;
use Onderdelen\Seneschal\DataTransferObjects\SuccessResponse;
use Onderdelen\Seneschal\DataTransferObjects\FailureResponse;

/**
 * Class AuthenticateRepository
 * @package Onderdelen\Seneschal\Repositories\Authenticate
 */
class AuthenticateRepository implements AuthenticateRepositoryInterface
{
    /**
     * @var Carbuncle
     */
    private $carbuncle;
    /**
     * @var \Einherjars\Carbuncle\Throttling\ProviderInterface
     */
    private $carbuncleThrottleProvider;
    /**
     * @var \Einherjars\Carbuncle\Users\ProviderInterface
     */
    private $carbuncleUserProvider;
    /**
     * @var Dispatcher
     */
    private $dispatcher;

    /**
     * @param Carbuncle  $carbuncle
     * @param Dispatcher $dispatcher
     */
    public function __construct(Carbuncle $carbuncle, Dispatcher $dispatcher)
    {
        // Carbuncle Singleton Object
        $this->carbuncle  = $carbuncle;
        $this->dispatcher = $dispatcher;

        // Get the Throttle Provider
        $this->carbuncleThrottleProvider = $this->carbuncle->getThrottleProvider();

        // Enable the Throttling Feature
        $this->carbuncleThrottleProvider->enable();

        // Get the user provider
        $this->carbuncleUserProvider = $this->carbuncle->getUserProvider();
    }

    /**
     * @param $data
     * @return ExceptionResponse|SuccessResponse
     */
    public function store($data)
    {
        try {
            // Check for 'rememberMe' in POST data
            $rememberMe = isset($data['rememberMe']);

            // Set login credentials
            $credentials['password'] = e($data['password']);
            $credentials['email']    = isset($data['email']) ? e($data['email']) : '';

            // Should we check for a username?
            if (Config::get('Seneschal::auth.allow_usernames', false) && isset($data['username'])) {
                $credentials['username'] = e($data['username']);
            }

            // If the email address is blank or not valid, try using the username as the primary login credential
            if (!$this->validEmail($credentials['email'])) {
                // Tell carbuncle to look for a username when attempting login
                $this->carbuncleUserProvider->getEmptyUser()->setLoginAttributeName('username');

                // Remove the email credential
                unset($credentials['email']);

                // Set the 'username' credential
                $credentials['username'] = (isset($credentials['username']) ? $credentials['username'] : e($data['email']));
            }

            //Check for suspension or banned status
            $user     = $this->carbuncleUserProvider->findByCredentials($credentials);
            $throttle = $this->carbuncleThrottleProvider->findByUserId($user->id);
            $throttle->check();

            // Try to authenticate the user
            $user = $this->carbuncle->authenticate($credentials, $rememberMe);

            // Might be unnecessary, but just in case:
            $this->carbuncleUserProvider->getEmptyUser()->setLoginAttributeName('email');

            // Login was successful. Fire the Seneschal.user.login event
            $this->dispatcher->fire('seneschal.user.login', ['user' => $user]);

            // Return Response Object
            return new SuccessResponse('');
        } catch (WrongPasswordException $e) {
            $message = trans('Seneschal::sessions.invalid');
            $this->recordLoginAttempt($credentials);

            return new ExceptionResponse($message);
        } catch (UserNotFoundException $e) {
            $message = trans('Seneschal::sessions.invalid');

            return new ExceptionResponse($message);
        } catch (UserNotActivatedException $e) {
            $url = route('seneschal.reactivate.form');
            $this->recordLoginAttempt($credentials);
            $message = trans('Seneschal::sessions.notactive', ['url' => $url]);

            return new ExceptionResponse($message);
        } catch (UserSuspendedException $e) {
            $message = trans('Seneschal::sessions.suspended');
            $this->recordLoginAttempt($credentials);

            return new ExceptionResponse($message);
        } catch (UserBannedException $e) {
            $message = trans('Seneschal::sessions.banned');
            $this->recordLoginAttempt($credentials);

            return new ExceptionResponse($message);
        }
    }

    /**
     * @return SuccessResponse
     */
    public function destroy()
    {
        // Fire the Seneschal User Logout event
        $user = $this->carbuncle->getUser();
        $this->dispatcher->fire('seneschal.user.logout', ['user' => $user]);

        // Destroy the user's session and log them out
        $this->carbuncle->logout();

        return new SuccessResponse('');
    }

    /**
     * @param $credentials
     */
    private function recordLoginAttempt($credentials)
    {
        if (array_key_exists('email', $credentials)) {
            $throttle = $this->carbuncle->findThrottlerByUserLogin(
                $credentials['email'],
                \Request::ip()
            );
        }

        if (array_key_exists('username', $credentials)) {
            $this->carbuncleUserProvider->getEmptyUser()->setLoginAttributeName('username');
            $throttle = $this->carbuncle->findThrottlerByUserLogin(
                $credentials['username'],
                \Request::ip()
            );
        }

        if (isset($throttle)) {
            $throttle->ip_address = \Request::ip();

            $throttle->addLoginAttempt();
        }
    }

    /**
     * @param $email
     * @return bool
     */
    private function validEmail($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        return true;
    }
}