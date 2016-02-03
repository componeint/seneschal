/**
 * group-edit-form.directive.js
 * Created by anonymous on 23/01/16 8:08.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('groupEditForm', groupEditForm);

    groupEditForm.$inject = ['Groups'];

    /* @ngInject */
    function groupEditForm(Groups) {
        var directive = {
            bindToController: true,
            controller      : GroupEditFormController,
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

    GroupEditFormController.$inject = ['Groups', 'ToastService'];

    /* @ngInject */
    function GroupEditFormController(Groups, ToastService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            var id;
            if (_.isString(vm.id)) {
                id = parseInt(vm.id);
            } else {
                id = vm.id;
            }

            Groups.get(id).then(function(response) {
                vm.records = response.data;
            });
        }

        function update(id) {
            Groups.getList().then(function(response) {
                vm.records = response;
                var listWithId = _.find(vm.records, function(list) {
                    return list.id === id;
                });

                listWithId.name = '';
                listWithId.put();

                /*
                // Alternatively delete the element from the list when finished
                listWithId.remove().then(function() {
                    // Updating the list and removing the user after the response is OK.
                    // vm.records = _.without(vm.records, listWithId);
                    var index = vm.records.indexOf(listWithId);
                    if (index > -1) {
                        vm.records.splice(index, 1);
                    }
                    vm.selected = [];
                    //$state.go('dashboard.groups');
                    ToastService.show('Group deleted.');
                });*/

            });

        }

        function destroy(id) {

            // Here we use then to resolve the promise.
            Groups.getList().then(function(response) {
                vm.lists = response;
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

