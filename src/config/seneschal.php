<?php
/**
 * seneschal.php
 * Modified from https://github.com/rydurham/Sentinel
 * by anonymous on 13/01/16 1:55.
 */

return [

    /*
    |--------------------------------------------------------------------------
    | Registration
    |--------------------------------------------------------------------------
    |
    | By default, registration is enabled.  To turn off registration, change this
    | value to false.
    |
    */

    'registration'              => true,
    /*
    |--------------------------------------------------------------------------
    | Activation
    |--------------------------------------------------------------------------
    |
    | By default, new accounts must be activated via email.  Setting this to
    | false will allow users to login immediately after signing up.
    |
    */

    'require_activation'        => true,
    /*
    |--------------------------------------------------------------------------
    | Allow Usernames
    |--------------------------------------------------------------------------
    |
    | By default, Sentry (and Seneschal) will only let a user log in using their
    | email address.  By setting 'allow_usernames' to true, a user can enter either
    | their username or their email address as a login credential.
    |
    */

    'allow_usernames'           => true,
    /*
    |--------------------------------------------------------------------------
    | Default User Groups
    |--------------------------------------------------------------------------
    |
    | When a new user is created, they will automatically be added to the
    | groups in this array.
    |
    */

    'default_user_groups'       => ['Users'],
    /*
    |--------------------------------------------------------------------------
    | Default Group Permissions
    |--------------------------------------------------------------------------
    |
    | When a new user is created, they will automatically be added to the
    | groups in this array.
    |
    */

    'default_permissions'       => ['admin', 'users'],
    /*
    |--------------------------------------------------------------------------
    | Custom User Fields
    |--------------------------------------------------------------------------
    |
    | If you want to add additional fields to your user model you can specify
    | their validation needs here.  You must update your db tables and add
    | the fields to your 'create' and 'edit' views before this will work.
    |
    */

    'additional_user_fields'    => [
        'first_name' => 'alpha_spaces',
        'last_name'  => 'alpha_spaces',
    ],
    /*
    |--------------------------------------------------------------------------
    | E-Mail Subject Lines
    |--------------------------------------------------------------------------
    |
    | When using the "Eloquent" authentication driver, we need to know which
    | Eloquent model should be used to retrieve your users. Of course, it
    | is often just the "User" model but you may use whatever you like.
    |
    */

    'subjects'                  => [
        'welcome'        => 'Account Registration Confirmation',
        'reset_password' => 'Password Reset Confirmation',
    ],
    /*
    |--------------------------------------------------------------------------
    | Default Routing
    |--------------------------------------------------------------------------
    |
    | Seneschal provides default routes for its sessions, users and groups.
    | You can use them as is, or you can disable them entirely.
    |
    */

    'routes_enabled'            => true,
    /*
    |--------------------------------------------------------------------------
    | URL Redirection for Method Completion
    |--------------------------------------------------------------------------
    |
    | Upon completion of their tasks, controller methods will look-up their
    | return destination here. You can specify a route, action or URL.
    | If no action is specified a JSON response will be returned.
    |
    */

    'routing'                   => [
        'session_store'                => ['route' => 'home'],
        'session_destroy'              => ['action' => '\\Seneschal\Controllers\SessionController@create'],
        'registration_complete'        => ['route' => 'home'],
        'registration_activated'       => ['route' => 'home'],
        'registration_resend'          => ['route' => 'home'],
        'registration_reset_triggered' => ['route' => 'home'],
        'registration_reset_invalid'   => ['route' => 'home'],
        'registration_reset_complete'  => ['route' => 'home'],
        'users_invalid'                => ['route' => 'home'],
        'users_store'                  => ['route' => 'seneschal.users.index'],
        'users_update'                 => ['route' => 'seneschal.users.show', 'parameters' => ['user' => 'hash']],
        'users_destroy'                => ['route' => 'seneschal.users.index'],
        'users_change_password'        => ['route' => 'seneschal.users.show', 'parameters' => ['user' => 'hash']],
        'users_change_memberships'     => ['route' => 'seneschal.users.show', 'parameters' => ['user' => 'hash']],
        'users_suspend'                => ['route' => 'seneschal.users.index'],
        'users_unsuspend'              => ['route' => 'seneschal.users.index'],
        'users_ban'                    => ['route' => 'seneschal.users.index'],
        'users_unban'                  => ['route' => 'seneschal.users.index'],
        'groups_store'                 => ['route' => 'seneschal.groups.index'],
        'groups_update'                => ['route' => 'seneschal.groups.index'],
        'groups_destroy'               => ['route' => 'seneschal.groups.index'],
        'profile_change_password'      => ['route' => 'seneschal.profile.show'],
        'profile_update'               => ['route' => 'seneschal.profile.show'],
    ],
    /*
    |--------------------------------------------------------------------------
    | Guest Middleware Redirection
    |--------------------------------------------------------------------------
    |
    | The SentryGuest middleware will redirect users with active sessions to
    | the route you specify here.  If left blank, the user will be taken
    | to the home route.
    |
    */

    'redirect_if_authenticated' => 'home',
    /*
    |--------------------------------------------------------------------------
    | Enable HTML Views
    |--------------------------------------------------------------------------
    |
    | There are situations in which you may not want to display any views
    | when interacting with Seneschal.  To return JSON instead of HTML,
    | turn this setting off. This cannot be done selectively.
    |
    */

    'views_enabled'             => false,
    /*
    |--------------------------------------------------------------------------
    | Master Layout
    |--------------------------------------------------------------------------
    |
    | By default Seneschal views will extend their own master layout. However,
    | you can specify a custom master layout view to use instead.
    |
    */

    'layout'                    => 'Seneschal::layouts.default',
    /*
    |--------------------------------------------------------------------------
    | Email Views
    |--------------------------------------------------------------------------
    |
    | String or array of views to use for emails
    |
    */

    'emails'                    => [
        'views' => [
            'welcome' => 'Seneschal::emails.welcome',
            'reset'   => 'Seneschal::emails.reset',
        ],
    ],

];
