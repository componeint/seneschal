/**
 * jwt-auth.service.js
 * Created by @anonymoussc on 06/12/15 12:15.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('jwtAuthService', jwtAuthService);

    jwtAuthService.$inject = ['$rootScope', '$http', '$auth'];

    /* @ngInject */
    function jwtAuthService($rootScope, $http, $auth) {

        var
            service = {
                getUsers: getUsers,
                signout : signout
            };

        return service;

        ////////////////

        function getUsers() {
            return $http.get('api/authenticate');
        }

        function signout() {

            return $auth.logout().then(function() {

                localStorage.removeItem('user');

                $rootScope.authenticated = false;
                $rootScope.currentUser   = null;

            });

        }

    }

})();

