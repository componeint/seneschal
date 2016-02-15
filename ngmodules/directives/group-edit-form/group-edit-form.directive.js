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

    GroupEditFormController.$inject = ['Groups', 'group', '$state', 'ToastService'];

    /* @ngInject */
    function GroupEditFormController(Groups, group, $state, ToastService) {
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
             Groups.get(id).then(function(response) {
             vm.list = response.data;
             });
             */

            group.edit(id).then(function(response) {
                vm.listWithId = response;
            }, function(error) {
                console.log(error);
                console.log('Error ' + error.data.status_code + ': ' + error.data.message);
                ToastService.show('Error ' + error.data.status_code + ': ' + error.data.message);
            })
        }

        function update(id) {

            // var editListWithId = vm.listWithId;

            // listWithId.username = vm.listWithId[0].group.name;
            // listWithId.email    = vm.listWithId[0].group.permissions;
            // vm.listWithId.put();

            Groups.getList().then(function(response) {
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

            });

        }

        function destroy(id) {

            // Here we use then to resolve the promise.
            Groups.getList().then(function(response) {
                vm.lists       = response;
                var listWithId = _.find(vm.lists, function(list) {
                    return list.id === id;
                });

                // groupWithId.name = '';
                // groupWithId.put();

                // Alternatively delete the element from the list when finished
                listWithId.remove().then(function() {
                    // Updating the list and removing the user after the response is OK.
                    // vm.lists = _.without(vm.lists, listWithId);
                    var index = vm.lists.indexOf(listWithId);
                    if (index > -1) {
                        vm.lists.splice(index, 1);
                    }
                    vm.selected = [];
                    //$state.go('dashboard.groups');
                    ToastService.show('Group deleted.');
                });

            });

            /*
             Groups.remove(id).then(function() {
             // vm.lists = _.without(vm.lists.data[id], id);
             // activate();
             ToastService.show('Group has been successfully deleted.');
             }, function(error) {
             console.log('Error : ' + error.status_code + ' : ' + error.message);
             });
             */

        }
    }

})();

