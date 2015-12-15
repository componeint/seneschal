/**
 * Created by anonymous on 15/12/15 13:50.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('userData', userData);

    userData.$inject = ['Restangular'];

    /* @ngInject */
    function userData(Restangular) {
        var restAngular = Restangular.withConfig(function(Configurer) {
            Configurer.setBaseUrl('api');
        });

        var service     = {
            get: get
        };
        return service;

        ////////////////

        function get() {
            return restAngular.all('authenticate').getList();
        }
    }

})();

