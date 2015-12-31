/**
 * Created by anonymous on 01/01/16 2:59.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('loginForm', loginForm);

    loginForm.$inject = [];

    /* @ngInject */
    function loginForm() {
        var directive = {
            bindToController: true,
            controller      : LoginFormController,
            controllerAs    : 'LoginForm',
            link            : link,
            restrict        : 'A',
            scope           : {}
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    LoginFormController.$inject = [];

    /* @ngInject */
    function LoginFormController() {

    }

})();

