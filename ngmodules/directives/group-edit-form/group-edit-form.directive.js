/**
 * group-edit-form.directive.js
 * Created by anonymous on 23/01/16 8:08.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('groupEditForm', groupEditForm);

    groupEditForm.$inject = [];

    /* @ngInject */
    function groupEditForm() {
        var directive = {
            bindToController: true,
            controller      : GroupEditFormController,
            controllerAs    : 'ctrl',
            link            : link,
            restrict        : 'EA',
            scope           : {
                id                  : '=id',
                successStateRedirect: '@'
            },
            templateUrl     : function(elem, attr) {
                return attr.template;
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    GroupEditFormController.$inject = ['API', 'Groups', 'group', '$state', 'ToastService'];

    /* @ngInject */
    function GroupEditFormController(API, Groups, group, $state, ToastService) {
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

            group.edit(id).then(function(response) {
                vm.listWithId = response;
            }, function(error) {
                ToastService.error('Error ' + error.data.status_code + ' : ' + error.data.message);

                // Log error message / object into console
                console.log(error);
                console.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            });
        }

        function update(id) {

            API.one('groups').doPUT(vm.listWithId[0].group, id).then(function(response) {
                //console.log(response);
                var stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.groups' : vm.successStateRedirect;

                $state.go(stateRedirect);
                ToastService.show('Group updated');
            }, function(error) {
                ToastService.error('Error ' + error.data.status_code + ' : ' + error.data.message);

                // Log error message / object into console
                console.log(error);
                console.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            });

            /*Groups.getList().then(function(response) {
                vm.lists = response;

                var editListWithId = _.find(vm.lists, function(list) {
                    return list.id === id;
                });

                editListWithId.name        = vm.listWithId[0].group.name;
                editListWithId.permissions = vm.listWithId[0].group.permissions;
                editListWithId.put();

                var stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.groups' : vm.successStateRedirect;

                $state.go(stateRedirect);
                ToastService.show('Group updated');

            }, function(error) {
                ToastService.error('Error ' + error.data.status_code + ' : ' + error.data.message);

                // Log error message / object into console
                console.log(error);
                console.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            });*/

        }

    }

})();

