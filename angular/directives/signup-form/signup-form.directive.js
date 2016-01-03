/**
 * Created by anonymous on 02/01/16 21:12.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('signupForm', signupForm);

    signupForm.$inject = [];

    /* @ngInject */
    function signupForm() {
        var directive = {
            bindToController: true,
            controller      : SignupFormController,
            controllerAs    : 'SignupForm',
            link            : link,
            restrict        : 'EA',
            scope           : {},
            templateUrl     : function(elem, attr) {
                return attr.template;
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    SignupFormController.$inject = ['$location', '$state', '$auth', 'ToastService'];

    /* @ngInject */
    function SignupFormController($location, $state, $auth, ToastService) {
        var vm   = this;
        vm.title = 'JwtAuthSignupController';
        // vm.user;
        vm.signup = signup;

        ////////////////

        function signup() {
            $auth.signup(vm.user)
                .then(function(response) {
                    $auth.setToken(response);
                    $state.go('jwtauth.home');
                    ToastService.show('You have successfully created a new account and have been signed-in');
                })
                .catch(function(response) {
                    console.log(response.data.message);
                    ToastService.error(response.data.message);
                });
        }

    }

})();

