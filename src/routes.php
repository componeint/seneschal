<?php
/**
 * Created by anonymous on 05/12/15 21:45.
 */

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    $api->post('authenticate', 'App\Http\Controllers\AuthenticateController@authenticate');
});

// Protected with JWT
$api->version('v1', ['middleware' => 'api.auth'], function ($api) {
    $api->get('authenticate', 'App\Http\Controllers\AuthenticateController@index');
    $api->get('authenticate/user', 'App\Http\Controllers\AuthenticateController@getAuthenticatedUser');
});
