/**
 * Created by anonymous on 06/12/15 12:15.
 */

(function() {
    'use strict';

    angular
        .module('components.factory')
        .factory('jwtAuthService', jwtAuthService);

    jwtAuthService.$inject = ['$http'];

    /* @ngInject */
    function jwtAuthService($http) {
        var service = {
            getUsers: getUsers
        };
        return service;

        ////////////////

        function getUsers() {
            return $http.get('api/authenticate')
                .then(getUsersComplete)
                .catch(getUsersFailed);

            function getUsersComplete(response) {
                return response.data.results;
            }

            function getUsersFailed(error) {
                console.log('XHR failed for getUser.' + error.data);
            }
        }
    }

})();

