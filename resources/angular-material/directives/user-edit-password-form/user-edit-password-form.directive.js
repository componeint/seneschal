/**
 * user-edit-password-form.directive.js
 * Created by anonymous on 21/02/16 23:26.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
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

    UserEditPasswordFormController.$inject = ['API', 'logService'];

    /* @ngInject */
    function UserEditPasswordFormController(API, logService) {

        var vm            = this;
        var
            id            = _.isString(vm.id) ? parseInt(vm.id) : vm.id,
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.users' : vm.successStateRedirect;


        activate();

        ////////////////

        function activate() {

            API.one('users', id).getList('edit').then(function(response) {

                vm.list        = response;
                vm.groups      = vm.list[0].groups;
                vm.permissions = vm.list[0].permissions;

            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }
    }

})();

