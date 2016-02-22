<?php
/**
 * AuthenticateRepository.php
 * Created by anonymous on 05/01/16 16:36.
 */

namespace Onderdelen\Seneschal\Repositories\Authenticate;

use Config;
use Illuminate\Events\Dispatcher;
use Cartalyst\Sentry\Sentry;
use Cartalyst\Sentry\Throttling\UserBannedException;
use Cartalyst\Sentry\Throttling\UserSuspendedException;
use Cartalyst\Sentry\Users\UserNotActivatedException;
use Cartalyst\Sentry\Users\UserNotFoundException;
use Cartalyst\Sentry\Users\LoginRequiredException;
use Cartalyst\Sentry\Users\PasswordRequiredException;
use Cartalyst\Sentry\Users\WrongPasswordException;
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
     * @var Sentry
     */
    private $sentry;
    /**
     * @var \Cartalyst\Sentry\Throttling\ProviderInterface
     */
    private $sentryThrottleProvider;
    /**
     * @var \Cartalyst\Sentry\Users\ProviderInterface
     */
    private $sentryUserProvider;
    /**
     * @var Dispatcher
     */
    private $dispatcher;

    /**
     * @param Sentry  $sentry
     * @param Dispatcher $dispatcher
     */
    public function __construct(Sentry $sentry, Dispatcher $dispatcher)
    {
        // Sentry Singleton Object
        $this->sentry  = $sentry;
        $this->dispatcher = $dispatcher;

        // Get the Throttle Provider
        $this->sentryThrottleProvider = $this->sentry->getThrottleProvider();

        // Enable the Throttling Feature
        $this->sentryThrottleProvider->enable();

        // Get the user provider
        $this->sentryUserProvider = $this->sentry->getUserProvider();
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
                // Tell sentry to look for a username when attempting login
                $this->sentryUserProvider->getEmptyUser()->setLoginAttributeName('username');

                // Remove the email credential
                unset($credentials['email']);

                // Set the 'username' credential
                $credentials['username'] = (isset($credentials['username']) ? $credentials['username'] : e($data['email']));
            }

            //Check for suspension or banned status
            $user     = $this->sentryUserProvider->findByCredentials($credentials);
            $throttle = $this->sentryThrottleProvider->findByUserId($user->id);
            $throttle->check();

            // Try to authenticate the user
            $user = $this->sentry->authenticate($credentials, $rememberMe);

            // Might be unnecessary, but just in case:
            $this->sentryUserProvider->getEmptyUser()->setLoginAttributeName('email');

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
        $user = $this->sentry->getUser();
        $this->dispatcher->fire('seneschal.user.logout', ['user' => $user]);

        // Destroy the user's session and log them out
        $this->sentry->logout();

        return new SuccessResponse('');
    }

    /**
     * @param $credentials
     */
    private function recordLoginAttempt($credentials)
    {
        if (array_key_exists('email', $credentials)) {
            $throttle = $this->sentry->findThrottlerByUserLogin(
                $credentials['email'],
                \Request::ip()
            );
        }

        if (array_key_exists('username', $credentials)) {
            $this->sentryUserProvider->getEmptyUser()->setLoginAttributeName('username');
            $throttle = $this->sentry->findThrottlerByUserLogin(
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