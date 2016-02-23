/**
 * user-edit-membership-form.directive.js
 * Created by anonymous on 21/02/16 23:24.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('userEditMembershipForm', userEditMembershipForm);

    userEditMembershipForm.$inject = [];

    /* @ngInject */
    function userEditMembershipForm() {

        var
            directive = {
                bindToController: true,
                controller      : UserEditMembershipFormController,
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

    UserEditMembershipFormController.$inject = ['API', 'logService', 'Toast'];

    /* @ngInject */
    function UserEditMembershipFormController(API, logService, Toast) {

        var vm            = this;
        var
            id            = _.isString(vm.id) ? parseInt(vm.id) : vm.id,
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.users' : vm.successStateRedirect;

        vm.updateGroupMemberships = updateGroupMemberships;


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

        function updateGroupMemberships(id) {

            vm.formData = {
                id    : id,
                groups: vm.membership
            };

            API.one('users', id).post('memberships', vm.formData).then(function(response) {

                // $state.go('dashboard.users');
                Toast.show('User group membership updated');

            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

