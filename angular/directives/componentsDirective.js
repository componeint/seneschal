(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name app
     *
     * @description
     * _Update the description and restriction._
     *
     * @restrict A
     * */
    angular.module('components.directives').directive('componentsDirective', [function() {
        return {
            restrict: 'A',
            link    : function(scope, elem, attr) {

            }
        };
    }]);
})();