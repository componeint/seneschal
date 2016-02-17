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

    UserEditFormController.$inject = ['API', '$state', 'Users', 'ToastService'];

    /* @ngInject */
    function UserEditFormController(API, $state, Users, ToastService) {
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

            /*
            Users.get(id).then(function(response) {
                vm.list = response.data;
            });
            */

            API.one('users', id).getList('edit').then(function(response) {
                vm.list = response;

                // console.log(vm.list);
            }, function(error) {
                ToastService.error('Error ' + error.data.status_code + ' : ' + error.data.message);

                // Log error message / object into console
                console.log(error);
                console.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            });
        }

        function update(id) {

            API.one('users').doPUT(vm.list[0].user, id).then(function(response) {
                //console.log(response);
                //var stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.users' : vm.successStateRedirect;

                //$state.go(stateRedirect);
                ToastService.show('User updated');
            }, function(error) {
                ToastService.error('Error ' + error.data.status_code + ' : ' + error.data.message);

                // Log error message / object into console
                console.log(error);
                console.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            });

            /*
            Users.getList().then(function(response) {
                vm.lists = response;

                var listWithId = _.find(vm.lists, function(list) {
                    return list.id === id;
                });

                listWithId.username = vm.list[0].username;
                listWithId.email    = vm.list[0].email;
                listWithId.put();

                $state.go('dashboard.users');
                ToastService.show('User updated.');

            });
            */

        }
    }

})();

