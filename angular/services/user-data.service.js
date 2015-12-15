/**
 * Created by anonymous on 15/12/15 13:50.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('userDataService', userDataService);

    userDataService.$inject = [''];

    /* @ngInject */
    function userDataService() {
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

