/**
 * reset-password-form.directive.js
 * Created by anonymous on 24/02/16 3:46.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('resetPasswordForm', resetPasswordForm);

    resetPasswordForm.$inject = [];

    /* @ngInject */
    function resetPasswordForm() {

        var
            directive = {
                bindToController: true,
                controller      : ResetPasswordFormController,
                controllerAs    : '$ctrl',
                link            : link,
                restrict        : 'EA',
                scope           : {
                    data                : '=',
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

    ResetPasswordFormController.$inject = ['API', '$state', 'logService', '$timeout', 'Toast'];

    /* @ngInject */
    function ResetPasswordFormController(API, $state, logService, $timeout, Toast) {

        var vm            = this;
        var
            hash          = vm.data.hash,
            code          = vm.data.code,
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'jwtauth.signin' : vm.successStateRedirect;

        vm.resetPassword = resetPassword;
        vm.canReset      = '';


        activate();

        ////////////////

        function activate() {

            API.one('reset', hash).doGET(code).then(function(response) {

                // console.log(response);

                if (!response.status.error) {
                    vm.canReset = true;
                } else if (response.status.error) {
                    vm.canReset = false;

                    $timeout(function() {

                        Toast.error('Invalid credential. Redirect in 5 second');

                        $state.go(stateRedirect);

                    }, 7000);

                }

            }, function(error) {

                vm.canReset = false;

                $timeout(function() {

                    Toast.error('Invalid credential. Redirect in 5 second');

                    $state.go(stateRedirect);

                }, 7000);

                logService.error(error);
                logService.debug(error);

            });

        }

        function resetPassword() {

            if (vm.canReset) {
                vm.formData = {
                    password             : vm.newPassword,
                    password_confirmation: vm.newPassword_confirmation
                };

                API.one('reset', vm.data.hash).doPOST(vm.formData, vm.data.code, {}, {}).then(function(response) {

                    if (!response.status.error) {
                        Toast.show('Password reset successful');

                        $timeout(function() {
                            $state.go(stateRedirect);
                        }, 7000);

                    }
                }, function(error) {

                    logService.error(error);
                    logService.debug(error);

                });

            } else if (!vm.canReset) {
                Toast.error('Invalid credential, unable to reset');

                $timeout(function() {
                    $state.go(stateRedirect);
                }, 7000);
            }

        }
    }

})();

