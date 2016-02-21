/**
 * user-edit-password-form.directive.js
 * Created by anonymous on 21/02/16 23:26.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('userEditPasswordForm', userEditPasswordForm);

    userEditPasswordForm.$inject = [];

    /* @ngInject */
    function userEditPasswordForm() {

        var
            directive = {
                bindToController: true,
                controller      : UserEditPasswordFormController,
                controllerAs    : '$ctrl',
                link            : link,
                restrict        : 'EA',
                scope           : {
                    id: '=id'
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

    UserEditPasswordFormController.$inject = [''];

    /* @ngInject */
    function UserEditPasswordFormController() {

        var vm            = this;
        var
            id            = _.isString(vm.id) ? parseInt(vm.id) : vm.id,
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.users' : vm.successStateRedirect;
    }

})();

