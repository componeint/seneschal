/**
 * user.service
 * Created by anonymous on 15/12/15 13:51.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('userService', userService);

    userService.$inject = [];

    /* @ngInject */
    function userService() {
        var service = {
            getAll : getAll,
            get    : get,
            find   : find,
            store  : store,
            update : update,
            destroy: destroy,
            crush  : crush
        };
        return service;

        ////////////////

        function getAll() {
            //
        }

        function get() {
            //
        }

        function find() {
            //
        }

        function store() {
            //
        }

        function update() {
            //
        }

        function destroy() {
            //
        }

        function crush() {
            //
        }
    }

})();

