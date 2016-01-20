<?php
/**
 * routes.php
 * Created by anonymous on 05/12/15 21:45.
 */

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    /*
     * Registration
     *
     */
    // // $api->get('register', ['as' => 'register.form', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@registration']);
    // $api->post('register', ['as' => 'register.user', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@register']);
    $api->post('auth/signup', ['as' => 'register.user', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@register']);
    $api->get('users/activate/{hash}/{code}', ['as' => 'activate', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@activate']);
    // // $api->get('reactivate', ['as' => 'reactivate.form', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@resendActivationForm']);
    $api->post('reactivate', ['as' => 'reactivate.send', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@resendActivation']);
    $api->get('forgot', ['as' => 'forgot.form', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@forgotPasswordForm']);
    $api->post('forgot', ['as' => 'reset.request', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@sendResetPasswordEmail']);
    // // $api->get('reset/{hash}/{code}', ['as' => 'reset.form', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@passwordResetForm']);
    $api->post('reset/{hash}/{code}', ['as' => 'reset.password', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@resetPassword']);

    /*
     * Authentication
     *
     */
    $api->post('auth/signin', 'Onderdelen\JwtAuth\Controllers\AuthenticateController@authenticate');

    /*
     * Profile
     *
     */
    $api->get('profile', ['as' => 'profile.show', 'uses' => 'Onderdelen\JwtAuth\Controllers\ProfileController@show']);
    $api->get('profile/edit', ['as' => 'profile.edit', 'uses' => 'Onderdelen\JwtAuth\Controllers\ProfileController@edit']);
    $api->put('profile', ['as' => 'profile.update', 'uses' => 'Onderdelen\JwtAuth\Controllers\ProfileController@update']);
    $api->post('profile/password', ['as' => 'profile.password', 'uses' => 'Onderdelen\JwtAuth\Controllers\ProfileController@changePassword']);

    /*
     * Users
     *
     */

    $api->get('users', ['as' => 'users.index', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@index']);
    // // $api->get('users/create', ['as' => 'users.create', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@create']);
    $api->post('users', ['as' => 'users.store', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@store']);

    $api->get('users/{hash}', ['as' => 'users.show', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@show']);
    $api->get('users/{hash}/edit', ['as' => 'users.edit', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@edit']);
    $api->post('users/{hash}/password', ['as' => 'password.change', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@changePassword']);
    $api->post('users/{hash}/memberships', ['as' => 'users.memberships', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@updateGroupMemberships']);
    $api->put('users/{hash}', ['as' => 'users.update', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@update']);
    $api->delete('users/{hash}', ['as' => 'users.destroy', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@destroy']);
    $api->get('users/{hash}/suspend', ['as' => 'users.suspend', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@suspend']);
    $api->get('users/{hash}/unsuspend', ['as' => 'users.unsuspend', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@unsuspend']);
    $api->get('users/{hash}/ban', ['as' => 'users.ban', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@ban']);
    $api->get('users/{hash}/unban', ['as' => 'users.unban', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@unban']);

    /*
     * Groups
     *
     */
    $api->get('groups', ['as' => 'groups.index', 'uses' => 'Onderdelen\JwtAuth\Controllers\GroupController@index']);
    // // $api->get('groups/create', ['as' => 'groups.create', 'uses' => 'Onderdelen\JwtAuth\Controllers\GroupController@create']);
    $api->post('groups', ['as' => 'groups.store', 'uses' => 'Onderdelen\JwtAuth\Controllers\GroupController@store']);
    $api->get('groups/{hash}', ['as' => 'groups.show', 'uses' => 'Onderdelen\JwtAuth\Controllers\GroupController@show']);
    $api->get('groups/{hash}/edit', ['as' => 'groups.edit', 'uses' => 'Onderdelen\JwtAuth\Controllers\GroupController@edit']);
    $api->put('groups/{hash}', ['as' => 'groups.update', 'uses' => 'Onderdelen\JwtAuth\Controllers\GroupController@update']);
    $api->delete('groups/{hash}', ['as' => 'groups.destroy', 'uses' => 'Onderdelen\JwtAuth\Controllers\GroupController@destroy']);
});

// Protected with JWT
$api->version('v1', ['middleware' => 'api.auth'], function ($api) {
    /*
     * Authentication
     *
     */
    $api->get('authenticate', 'Onderdelen\JwtAuth\Controllers\AuthenticateController@index');
    $api->get('authenticate/user', 'Onderdelen\JwtAuth\Controllers\AuthenticateController@getAuthenticatedUser');
});

