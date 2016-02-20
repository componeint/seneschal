/**
 * forgot-password-form.directive.js
 * Created by anonymous on 20/02/16 22:03.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
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
                scope           : {},
                templateUrl     : function(elem, attr) {
                    return attr.template;
                }
            };

        return directive;

        function link(scope, element, attrs) {
            //
        }

    }

    ForgotPasswordFormController.$inject = [];

    /* @ngInject */
    function ForgotPasswordFormController() {

    }

})();

