/**
 * signin-form.directive.js
 * Created by @anonymoussc on 01/01/16 15:01.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('signinForm', signinForm);

    signinForm.$inject = [];

    /* @ngInject */
    function signinForm() {
        var
            directive = {
                bindToController: true,
                controller      : SigninFormController,
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

    SigninFormController.$inject = ['$rootScope', '$auth', '$http', '$state', 'logService', 'Toast'];

    /* @ngInject */
    function SigninFormController($rootScope, $auth, $http, $state, logService, Toast) {

        var vm            = this,
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'jwtauth.home' : vm.successStateRedirect;

        vm.loginError     = false;
        vm.loginErrorText = '';
        vm.login          = login;

        ////////////////

        function login() {

            var
                credentials = {
                    email   : vm.email,
                    password: vm.password
                };

            $auth.login(credentials).then(function() {
                return $http.get('api/authenticate/user');
            }, function(error) {

                vm.loginError     = true;
                vm.loginErrorText = error.data.message;

                logService.error(error);
                logService.debug(error);

            }).then(function(response) {

                response.data.user.permissions = response.data.permissions;

                var user = JSON.stringify(response.data.user);

                localStorage.setItem('user', user);

                $rootScope.authenticated = true;
                $rootScope.currentUser   = response.data.user;

                $state.go(stateRedirect);

            }).catch(function(error) {

                if (_.isEmpty(error.data.status_code)) {
                    if (error.data.status_code === 401) {
                        $state.go('jwtauth.users-reactivate');
                    }

                    //Toast.error(error.data.message);
                }

            });

        }

    }

})();

