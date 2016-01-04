/**
 * Created by anonymous on 06/12/15 5:02.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .config(jwtAuth);

    jwtAuth.$inject = ['$authProvider'];

    /* @ngInject */
    function jwtAuth($authProvider) {
        $authProvider.loginUrl    = '/api/authenticate';
        $authProvider.signupUrl   = '/api/auth/signup';
        $authProvider.tokenName   = 'token';
        $authProvider.tokenPrefix = 'app';
    }

})();

