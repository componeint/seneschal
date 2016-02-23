/**
 * registration.service
 * Created by anonymous on 01/02/16 7:23.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('Registration', Registration);

    Registration.$inject = [];

    /* @ngInject */
    function Registration() {
        var service = {
            registration          : registration,
            register              : register,
            activate              : activate,
            resendActivationForm  : resendActivationForm,
            resendActivation      : resendActivation,
            forgotPasswordForm    : forgotPasswordForm,
            sendResetPasswordEmail: sendResetPasswordEmail,
            passwordResetForm     : passwordResetForm,
            resetPassword         : resetPassword
        };
        return service;

        ////////////////

        function registration() {
            //
        }

        function register() {
            //
        }

        function activate() {
            //
        }

        function resendActivationForm() {
            //
        }

        function resendActivation() {
            //
        }

        function forgotPasswordForm() {
            //
        }

        function sendResetPasswordEmail() {
            //
        }

        function passwordResetForm() {
            //
        }

        function resetPassword() {
            //
        }

    }

})();

