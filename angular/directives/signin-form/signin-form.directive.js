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
            controllerAs    : 'vm',
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

    SigninFormController.$inject = ['$auth', '$state', '$http', '$rootScope', 'ToastService'];

    /* @ngInject */
    function SigninFormController($auth, $state, $http, $rootScope, ToastService) {
        var vm        = this;
        vm.loginError = false;
        vm.loginErrorText;
        vm.login      = login;

        ////////////////

        function login() {
            var
                credentials = {
                    email   : vm.email,
                    password: vm.password
                };

            $auth.login(credentials)
                .then(function() {
                    return $http.get('api/authenticate/user');
                }, function(error) {
                    vm.loginError     = true;
                    vm.loginErrorText = error.data.error;
                    ToastService.show(error.data.error);
                })
                .then(function(response) {
                    var user                 = JSON.stringify(response.data.user);
                    localStorage.setItem('user', user);
                    $rootScope.authenticated = true;
                    $rootScope.currentUser   = response.data.user;
                    $state.go('jwtauth.home');
                });
        }

    }

})();

