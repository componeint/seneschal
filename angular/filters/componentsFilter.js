(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name app
     * @description
     * _Please update the description and dependencies._
     *
     * */
    angular.module('components.filters').filter('componentsFilter', function() {
        return function(input) {
            return input;
        };
    });

})();