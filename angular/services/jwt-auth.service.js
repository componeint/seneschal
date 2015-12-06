/**
 * Created by anonymous on 06/12/15 12:15.
 */

(function() {
    'use strict';

    angular
        .module('components.factory')
        .factory('jwtAuthService', jwtAuthService);

    jwtAuthService.$inject = ['$rootScope','$http', '$auth'];

    /* @ngInject */
    function jwtAuthService($rootScope, $http, $auth) {
        var service = {
            getUsers: getUsers,
            signout : signout
        };
        return service;

        ////////////////

        function getUsers() {
            return $http.get('api/authenticate');
            /*    .then(getUsersComplete)
                .catch(getUsersFailed);

            function getUsersComplete(response) {
                return response.data.results;
            }

            function getUsersFailed(error) {
                console.log('XHR failed for getUser.' + error.data);
            }*/
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

