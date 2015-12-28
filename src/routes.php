<?php
/**
 * Created by anonymous on 05/12/15 21:45.
 */

$api = app('Dingo\Api\Routing\Router');

//use Onderdelen\JwtAuth\Models\User;

$api->version('v1', function ($api) {
    $api->post('authenticate', 'Onderdelen\JwtAuth\Controllers\AuthenticateController@authenticate');
    $api->post('auth/signup', ['as' => 'register.user', 'uses' => 'Onderdelen\JwtAuth\Controllers\RegistrationController@register']);
    $api->get('users', ['as' => 'users.index', 'uses' => 'Onderdelen\JwtAuth\Controllers\UserController@index']);
});

// Protected with JWT
$api->version('v1', ['middleware' => 'api.auth'], function ($api) {
    $api->get('authenticate', 'Onderdelen\JwtAuth\Controllers\AuthenticateController@index');
    $api->get('authenticate/user', 'Onderdelen\JwtAuth\Controllers\AuthenticateController@getAuthenticatedUser');
});

// Route::post('/auth/signup', 'Onderdelen\JwtAuth\Controllers\AuthenticateController@signup');
// Route::post('register', ['as' => 'sentinel.register.user', 'uses' => 'RegistrationController@register']);
// Route::get('users', ['as' => 'sentinel.users.index', 'uses' => 'UserController@index']);

//Route::get('/users', 'Onderdelen\JwtAuth\Controllers\UserController@index');