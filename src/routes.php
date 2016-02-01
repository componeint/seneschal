<?php
/**
 * routes.php
 * Created by anonymous on 05/12/15 21:45.
 */

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['namespace' => 'Onderdelen\JwtAuth\Controllers'], function ($api) {
    /*
     * Registration
     *
     */
    // // $api->get('register', ['as' => 'register.form', 'uses' => 'RegistrationController@registration']);
    // $api->post('register', ['as' => 'register.user', 'uses' => 'RegistrationController@register']);
    $api->post('auth/signup', ['as' => 'register.user', 'uses' => 'RegistrationController@register']);
    $api->get('users/activate/{hash}/{code}', ['as' => 'activate', 'uses' => 'RegistrationController@activate']);
    // // $api->get('reactivate', ['as' => 'reactivate.form', 'uses' => 'RegistrationController@resendActivationForm']);
    $api->post('reactivate', ['as' => 'reactivate.send', 'uses' => 'RegistrationController@resendActivation']);
    $api->get('forgot', ['as' => 'forgot.form', 'uses' => 'RegistrationController@forgotPasswordForm']);
    $api->post('forgot', ['as' => 'reset.request', 'uses' => 'RegistrationController@sendResetPasswordEmail']);
    // // $api->get('reset/{hash}/{code}', ['as' => 'reset.form', 'uses' => 'RegistrationController@passwordResetForm']);
    $api->post('reset/{hash}/{code}', ['as' => 'reset.password', 'uses' => 'RegistrationController@resetPassword']);

    /*
     * Authentication
     *
     */
    $api->post('auth/signin', 'AuthenticateController@authenticate');

    /*
     * Profile
     *
     */
    $api->get('profile', ['as' => 'profile.show', 'uses' => 'ProfileController@show']);
    $api->get('profile/edit', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
    $api->put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
    $api->post('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@changePassword']);

    /*
     * Users
     *
     */

    $api->get('users', ['as' => 'users.index', 'uses' => 'UserController@index']);
    // // $api->get('users/create', ['as' => 'users.create', 'uses' => 'UserController@create']);
    $api->post('users', ['as' => 'users.store', 'uses' => 'UserController@store']);

    $api->get('users/{hash}', ['as' => 'users.show', 'uses' => 'UserController@show']);
    $api->get('users/{hash}/edit', ['as' => 'users.edit', 'uses' => 'UserController@edit']);
    $api->post('users/{hash}/password', ['as' => 'password.change', 'uses' => 'UserController@changePassword']);
    $api->post('users/{hash}/memberships',
        ['as' => 'users.memberships', 'uses' => 'UserController@updateGroupMemberships']);
    $api->put('users/{hash}', ['as' => 'users.update', 'uses' => 'UserController@update']);
    $api->delete('users/{hash}', ['as' => 'users.destroy', 'uses' => 'UserController@destroy']);
    $api->get('users/{hash}/suspend', ['as' => 'users.suspend', 'uses' => 'UserController@suspend']);
    $api->get('users/{hash}/unsuspend', ['as' => 'users.unsuspend', 'uses' => 'UserController@unsuspend']);
    $api->get('users/{hash}/ban', ['as' => 'users.ban', 'uses' => 'UserController@ban']);
    $api->get('users/{hash}/unban', ['as' => 'users.unban', 'uses' => 'UserController@unban']);

    /*
     * Groups
     *
     */
    $api->get('groups', ['as' => 'groups.index', 'uses' => 'GroupController@index']);
    // // $api->get('groups/create', ['as' => 'groups.create', 'uses' => 'GroupController@create']);
    $api->post('groups', ['as' => 'groups.store', 'uses' => 'GroupController@store']);
    $api->get('groups/{hash}', ['as' => 'groups.show', 'uses' => 'GroupController@show']);
    $api->get('groups/{hash}/edit', ['as' => 'groups.edit', 'uses' => 'GroupController@edit']);
    $api->put('groups/{hash}', ['as' => 'groups.update', 'uses' => 'GroupController@update']);
    $api->delete('groups/{hash}', ['as' => 'groups.destroy', 'uses' => 'GroupController@destroy']);
});

// Protected with JWT
$api->version('v1', ['middleware' => 'api.auth', 'namespace' => 'Onderdelen\JwtAuth\Controllers'], function ($api) {
    /*
     * Authentication
     *
     */
    $api->get('authenticate', 'AuthenticateController@index');
    $api->get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
});

