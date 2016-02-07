/**
 * authenticate.service
 * Created by anonymous on 31/01/16 22:45.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('Authenticate', Authenticate)
        .factory('Auth', Auth);

    Authenticate.$inject = ['API'];
    Auth.$inject         = ['$http', '$auth'];

    /* @ngInject */
    function Authenticate(API) {
        return API.all('authenticate');
    }

    /* @ngInject */
    function Auth($http, $auth) {
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
            return $auth.login(credentials);
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

