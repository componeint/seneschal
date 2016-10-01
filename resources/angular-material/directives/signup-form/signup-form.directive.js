/**
 * signup-form.directive.js
 * Created by @anonymoussc on 02/01/16 21:12.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('signupForm', signupForm);

    signupForm.$inject = [];

    /* @ngInject */
    function signupForm() {

        var
            directive = {
                bindToController: true,
                controller      : SignupFormController,
                controllerAs    : '$ctrl',
                link            : link,
                restrict        : 'EA',
                scope           : {
                    successStateRedirect: '@'
                },
                templateUrl     : function(elem, attr) {
                    return attr.template;
                }
            };

        return directive;

        function link(scope, element, attrs) {
            //
        }

    }

    SignupFormController.$inject = ['$state', '$auth', 'Toast', 'logService'];

    /* @ngInject */
    function SignupFormController($state, $auth, Toast, logService) {

        var vm            = this;
        var stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'app.home' : vm.successStateRedirect;

        vm.signup = signup;


        ////////////////

        function signup() {

            $auth.signup(vm.user).then(function(response) {

                $auth.setToken(response);

                $state.go(stateRedirect);

                Toast.show('You have successfully created a new account and have been signed-in');

            }).catch(function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

