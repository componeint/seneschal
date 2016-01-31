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
        var directive = {
            bindToController: true,
            controller      : UserEditFormController,
            controllerAs    : 'ctrl',
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

        }
    }

    UserEditFormController.$inject = ['$state', 'Users', 'ToastService'];

    /* @ngInject */
    function UserEditFormController($state, Users, ToastService) {
        var vm    = this;
        vm.update = update;

        activate();

        ////////////////

        function activate() {
            var id;
            if (_.isString(vm.id)) {
                id = parseInt(vm.id);
            } else {
                id = vm.id;
            }

            Users.get(id).then(function(response) {
                vm.list = response.data;
            });
        }

        function update(id) {
            Users.getList().then(function(response) {
                vm.lists = response;

                var listWithId = _.find(vm.lists, function(list) {
                    return list.id === id;
                });

                listWithId.username = vm.list.username;
                listWithId.email    = vm.list.email;
                // listWithId.password              = vm.list.password;
                // listWithId.password_confirmation = vm.list.password_confirmation;
                // listWithId.activate              = vm.list.activate;
                listWithId.put();

                $state.go('dashboard.users');
                ToastService.show('User updated.');

            });

        }
    }

})();

