/**
 * forgot-password-form.directive.js
 * Created by anonymous on 20/02/16 22:03.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('forgotPasswordForm', forgotPasswordForm);

    forgotPasswordForm.$inject = [];

    /* @ngInject */
    function forgotPasswordForm() {
        var
            directive = {
                bindToController: true,
                controller      : ForgotPasswordFormController,
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

    ForgotPasswordFormController.$inject = ['API', '$state', 'logService', '$timeout', 'Toast'];

    /* @ngInject */
    function ForgotPasswordFormController(API, $state, logService, $timeout, Toast) {

        var vm            = this;
        var stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'jwtauth.signin' : vm.successStateRedirect;

        vm.forgotPassword = forgotPassword;


        activate();

        ////////////////

        function activate() {
            //
        }

        function forgotPassword() {

            vm.formData = {
                email: vm.email
            };

            API.one('forgot').doPOST(vm.formData).then(function(response) {

                if (!response.status.error) {
                    Toast.show('Email sent');

                    $timeout(function() {
                        $state.go(stateRedirect);
                    }, 7000);
                }
            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

