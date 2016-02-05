/**
 * authenticate.service
 * Created by anonymous on 31/01/16 22:45.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('authenticate', authenticate);

    authenticate.$inject = [];

    /* @ngInject */
    function authenticate() {
        var service = {
            authenticate        : authenticate,
            getAuthenticatedUser: getAuthenticatedUser,
            create              : create,
            store               : store,
            destroy             : destroy
        };
        return service;

        ////////////////

        function authenticate() {
            //
        }

        function getAuthenticatedUser() {
            //
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

