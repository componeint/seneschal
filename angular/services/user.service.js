/**
 * Created by anonymous on 15/12/15 13:51.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('userService', userService);

    userService.$inject = [''];

    /* @ngInject */
    function userService() {
        var service = {
            functionName: functionName
        };
        return service;

        ////////////////

        function functionName() {
            //
        }
    }

})();

