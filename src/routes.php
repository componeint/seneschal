<?php
/**
 * routes.php
 * Created by anonymous on 05/12/15 21:45.
 */

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['namespace' => 'Onderdelen\Seneschal\Controllers'], function ($api) {

    // Registration
    // // $api->get('register', ['as' => 'seneschal.register.form', 'uses' => 'RegistrationController@registration']);
    // $api->post('register', ['as' => 'seneschal.register.user', 'uses' => 'RegistrationController@register']);

    $api->post('auth/signup', ['as' => 'seneschal.register.user', 'uses' => 'RegistrationController@register']);

    $api->get('users/activate/{hash}/{code}',
        ['as' => 'seneschal.user.activate', 'uses' => 'RegistrationController@activate']);

    // // $api->get('reactivate', ['as' => 'seneschal.reactivate.form', 'uses' => 'RegistrationController@resendActivationForm']);
    $api->post('reactivate',
        ['as' => 'seneschal.reactivate.send', 'uses' => 'RegistrationController@resendActivation']);

    $api->get('forgot', ['as' => 'seneschal.forgot.form', 'uses' => 'RegistrationController@forgotPasswordForm']);

    $api->post('forgot',
        ['as' => 'seneschal.reset.request', 'uses' => 'RegistrationController@sendResetPasswordEmail']);

    // // $api->get('reset/{hash}/{code}', ['as' => 'seneschal.reset.form', 'uses' => 'RegistrationController@passwordResetForm']);

    $api->post('reset/{hash}/{code}',
        ['as' => 'seneschal.reset.password', 'uses' => 'RegistrationController@resetPassword']);


    // Authentication
    $api->post('auth/signin', 'AuthenticateController@authenticate');

    // Profile
    $api->get('profile', ['as' => 'seneschal.profile.show', 'uses' => 'ProfileController@show']);
    $api->get('profile/edit', ['as' => 'seneschal.profile.edit', 'uses' => 'ProfileController@edit']);
    $api->put('profile', ['as' => 'seneschal.profile.update', 'uses' => 'ProfileController@update']);

    $api->post('profile/password',
        ['as' => 'seneschal.profile.password', 'uses' => 'ProfileController@changePassword']);

    // Users
    $api->get('users', ['as' => 'seneschal.users.index', 'uses' => 'UserController@index']);
    // // $api->get('users/create', ['as' => 'seneschal.users.create', 'uses' => 'UserController@create']);
    $api->post('users', ['as' => 'seneschal.users.store', 'uses' => 'UserController@store']);
    $api->get('users/{id}', ['as' => 'seneschal.users.show', 'uses' => 'UserController@show']);
    $api->get('users/{id}/edit', ['as' => 'seneschal.users.edit', 'uses' => 'UserController@edit']);
    $api->post('users/{id}/password', ['as' => 'seneschal.password.change', 'uses' => 'UserController@changePassword']);

    $api->post('users/{id}/memberships',
        ['as' => 'seneschal.users.memberships', 'uses' => 'UserController@updateGroupMemberships']);

    $api->put('users/{id}', ['as' => 'seneschal.users.update', 'uses' => 'UserController@update']);
    $api->delete('users/{id}', ['as' => 'seneschal.users.destroy', 'uses' => 'UserController@destroy']);
    $api->get('users/{id}/suspend', ['as' => 'seneschal.users.suspend', 'uses' => 'UserController@suspend']);
    $api->get('users/{id}/unsuspend', ['as' => 'seneschal.users.unsuspend', 'uses' => 'UserController@unsuspend']);
    $api->get('users/{id}/ban', ['as' => 'seneschal.users.ban', 'uses' => 'UserController@ban']);
    $api->get('users/{id}/unban', ['as' => 'seneschal.users.unban', 'uses' => 'UserController@unban']);


    // Groups
    $api->get('groups', ['as' => 'seneschal.groups.index', 'uses' => 'GroupController@index']);
    // // $api->get('groups/create', ['as' => 'seneschal.groups.create', 'uses' => 'GroupController@create']);
    $api->post('groups', ['as' => 'seneschal.groups.store', 'uses' => 'GroupController@store']);
    $api->get('groups/{id}', ['as' => 'seneschal.groups.show', 'uses' => 'GroupController@show']);
    $api->get('groups/{id}/edit', ['as' => 'seneschal.groups.edit', 'uses' => 'GroupController@edit']);
    $api->put('groups/{id}', ['as' => 'seneschal.groups.update', 'uses' => 'GroupController@update']);
    $api->delete('groups/{id}', ['as' => 'seneschal.groups.destroy', 'uses' => 'GroupController@destroy']);
});

// Protected with JWT
$api->version('v1', ['middleware' => 'api.auth', 'namespace' => 'Onderdelen\Seneschal\Controllers'], function ($api) {

    // Authentication
    $api->get('authenticate', 'AuthenticateController@index');
    $api->get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
});

Route::get('/#/users/activate/{hash}/{code}',
    ['as' => 'seneschal.activate', 'uses' => 'Onderdelen\Seneschal\Controllers\RegistrationController@activate']);

Route::get('/#/reset/{hash}/{code}',
    ['as' => 'seneschal.reset.form', 'uses' => 'Onderdelen\Seneschal\Controllers\RegistrationController@passwordResetForm']);
