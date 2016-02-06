/**
 * auth.service
 * Created by anonymous on 31/01/16 22:45.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('auth', authenticate);

    authenticate.$inject = ['$http', '$auth'];

    /* @ngInject */
    function authenticate($http, $auth) {
        var service = {
            authenticate        : authenticate,
            getAuthenticatedUser: getAuthenticatedUser,
            create              : create,
            store               : store,
            destroy             : destroy
        };
        return service;

        ////////////////

        function authenticate(credentials) {
            return $auth.login(credentials)
        }

        function getAuthenticatedUser() {
            return $http.get('api/authenticate/user');
        }

        function create() {
            //
        }

        function store() {
            //
        }

        function destroy() {
            //
        }
    }

})();

