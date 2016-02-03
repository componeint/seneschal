/**
 * Created by anonymous on 01/01/16 18:51.
 */

(function() {
    'use strict';

    angular
        .module('appFoundation')
        .directive('passwordMatch', passwordMatch);

    passwordMatch.$inject = [];

    /* @ngInject */
    function passwordMatch() {
        var directive = {
            require: 'ngModel',
            link   : link,
            scope  : {
                otherModelValue: '=passwordMatch'
            }
        };
        return directive;

        function link(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue === scope.otherModelValue;
            };
            scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    }

})();

