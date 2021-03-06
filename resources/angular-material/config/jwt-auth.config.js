/**
 * jwt-auth.config.js
 * Created by @anonymoussc on 06/12/15 5:02.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .config(jwtAuth);

    jwtAuth.$inject = ['$authProvider'];

    /* @ngInject */
    function jwtAuth($authProvider) {
        $authProvider.loginUrl    = '/api/auth/signin';
        $authProvider.signupUrl   = '/api/auth/signup';
        $authProvider.tokenName   = 'token';
        $authProvider.tokenPrefix = 'onsigbaar';
    }

})();

