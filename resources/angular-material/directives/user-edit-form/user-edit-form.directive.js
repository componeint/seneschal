/**
 * user-edit-form.directive.js
 * Created by anonymous on 23/01/16 8:13.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('userEditForm', userEditForm);

    userEditForm.$inject = [];

    /* @ngInject */
    function userEditForm() {

        var
            directive = {
                bindToController: true,
                controller      : UserEditFormController,
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

    UserEditFormController.$inject = ['API', '$state', 'Toast', 'logService'];

    /* @ngInject */
    function UserEditFormController(API, $state, Toast, logService) {

        var vm            = this;
        var
            id            = _.isString(vm.id) ? parseInt(vm.id) : vm.id,
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.users' : vm.successStateRedirect;

        vm.update = update;


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

        function update(id) {

            API.one('users').doPUT(vm.list[0].user, id).then(function(response) {

                // $state.go(stateRedirect);

                Toast.show('User updated');

            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

