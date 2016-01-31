/**
 * user-data.service.js
 * Created by anonymous on 15/12/15 13:50.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('userData', userData);

    userData.$inject = ['API'];

    /* @ngInject */
    function userData(API) {
        var service = {
            get: get
        };

        return service;

        ////////////////

        function get() {
            return API.all('authenticate').getList();
        }
    }

})();

