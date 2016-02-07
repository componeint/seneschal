/**
 * group-data-table.directive.js
 * Created by anonymous on 07/01/16 19:01.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('groupDataTable', groupDataTable);

    groupDataTable.$inject = [];

    /* @ngInject */
    function groupDataTable() {
        var directive = {
            bindToController: true,
            controller      : GroupDataTableController,
            controllerAs    : 'ctrl',
            link            : link,
            restrict        : 'EA',
            scope           : {},
            templateUrl     : function(elem, attr) {
                return attr.template;
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    GroupDataTableController.$inject = ['$http', '$mdEditDialog', '$q', '$timeout', 'Groups', 'ToastService'];

    /* @ngInject */
    function GroupDataTableController($http, $mdEditDialog, $q, $timeout, Groups, ToastService) {
        var vm        = this;
        vm.onPaginate = onPaginate;
        vm.deselect   = deselect;
        vm.log        = log;
        // vm.loading    = loading;
        // vm.reload     = reload;
        vm.refresh   = refresh;
        vm.onReorder = onReorder;
        vm.destroy   = destroy;
        vm.crush     = crush;

        activate();

        ////////////////

        function activate() {
            /*$http.get('api/groups').then(function(response) {
             vm.lists = response.data.data;
             // console.log(response.data);
             // $timeout(function () {
             //   vm.lists = responses.data;
             // }, 1000);
             }, function(error) {
             console.log('error: ' + error);
             });*/
            Groups.getList().then(function(response) {
                vm.lists = response;
                // console.log(response);
                //ToastService.show('Refreshed');
            }, function(error) {
                console.log('error: ' + error);
            });
        }

        vm.selected = [];

        vm.query = {
            order: 'id',
            limit: 5,
            page : 1
        };

        vm.columns = [
            {
                name   : 'Name',
                orderBy: 'name'
            },
            {
                name   : 'Permissions',
                orderBy: 'permissions'
            },
            {
                name   : 'Created',
                orderBy: 'created_at'
            },
            {
                name   : 'Updated',
                orderBy: 'updated_at'
            }
        ];

        function onPaginate(page, limit) {
            // console.log('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.limit);
            // console.log('Page: ' + page + ' Limit: ' + limit);

            vm.promise = $timeout(function() {

            }, 2000);
        }

        function deselect(item) {
            // console.log(item.name, 'was deselected');
        }

        function log(item) {
            // console.log(item.name, 'was selected');
        }

        function loading() {
            Groups.getList().then(function(response) {
                vm.lists = response;
            }, function(error) {
                console.log('error: ' + error);
            });
        }

        function reload() {
            loading();
        }

        function refresh() {
            vm.promise = $timeout(function() {
                loading();
                ToastService.show('Refreshed');
            }, 1000);
        }

        function onReorder(order) {

            // console.log('Scope Order: ' + vm.query.order);
            // console.log('Order: ' + order);

            vm.promise = $timeout(function() {

            }, 2000);
        }

        function destroy(id) {
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
                ToastService.show('Group deleted');
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

        function crush(collection) {
            for (var i = 0; i < collection.length; i++) {
                var listWithId = _.find(vm.lists, function(list) {

                    if (list.id === collection[i].id) {
                        return list.id === collection[i].id;
                    }
                });

                // Alternatively delete the element from the list when finished
                // console.log('listWithId ' + listWithId);
                /*listWithId.remove().then(function() {
                 // Updating the list and removing the user after the response is OK.
                 vm.lists = _.without(vm.lists, listWithId);
                 vm.selected = [];
                 });*/

                listWithId.remove().then(function() {
                    var index = vm.lists.indexOf(listWithId);
                    if (index > -1) {
                        vm.lists.splice(index, 1);
                    }
                    vm.selected = [];

                });
            }

            reload();
            ToastService.show('Groups deleted');
        }

    }

})();

