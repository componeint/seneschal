/**
 * Created by anonymous on 01/01/16 15:01.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('signinForm', signinForm);

    signinForm.$inject = [];

    /* @ngInject */
    function signinForm() {
        var directive = {
            bindToController: true,
            controller      : SigninFormController,
            controllerAs    : 'SigninForm',
            link            : link,
            restrict        : 'A',
            scope           : {}
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    SigninFormController.$inject = [];

    /* @ngInject */
    function SigninFormController() {

    }

})();

