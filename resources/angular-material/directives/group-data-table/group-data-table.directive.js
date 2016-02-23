/**
 * group-data-table.directive.js
 * Created by anonymous on 07/01/16 19:01.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('groupDataTable', groupDataTable);

    groupDataTable.$inject = [];

    /* @ngInject */
    function groupDataTable() {

        var
            directive = {
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

    GroupDataTableController.$inject = ['API', '$mdEditDialog', '$q', '$timeout', 'Toast', 'logService'];

    /* @ngInject */
    function GroupDataTableController(API, $mdEditDialog, $q, $timeout, Toast, logService) {

        var vm     = this;
        var Groups = API.all('groups');

        vm.selected   = [];
        vm.query      = {
            order: 'id',
            limit: 5,
            page : 1
        };
        vm.columns    = [
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
            },
            {
                name: 'Option'
            }
        ];
        vm.onPaginate = onPaginate;
        vm.deselect   = deselect;
        vm.log        = log;
        vm.refresh    = refresh;
        vm.onReorder  = onReorder;
        vm.destroy    = destroy;
        vm.crush      = crush;


        activate();

        ////////////////

        function activate() {

            Groups.getList().then(function(response) {
                vm.lists = response;
            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

        function onPaginate(page, limit) {

            // console.log('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.limit);
            // console.log('Page: ' + page + ' Limit: ' + limit);

            vm.promise = $timeout(function() {
                //
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

                logService.error(error);
                logService.debug(error);

            });

        }

        function reload() {
            loading();
        }

        function refresh() {

            vm.promise = $timeout(function() {

                loading();

                Toast.show('Refreshed');

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

            // Alternatively delete the element from the list when finished
            listWithId.remove().then(function() {

                // Updating the list and removing the user after the response is OK.
                // vm.lists = _.without(vm.lists, listWithId);
                var index = vm.lists.indexOf(listWithId);
                if (index > -1) {
                    vm.lists.splice(index, 1);
                }

                vm.selected = [];

                Toast.show('Group deleted');

            });

        }

        function crush(collection) {

            for (var i = 0; i < collection.length; i++) {
                var listWithId = _.find(vm.lists, function(list) {

                    if (list.id === collection[i].id) {
                        return list.id === collection[i].id;
                    }

                });

                listWithId.remove().then(function() {

                    var index = vm.lists.indexOf(listWithId);

                    if (index > -1) {
                        vm.lists.splice(index, 1);
                    }

                    vm.selected = [];

                });

            }

            reload();

            Toast.show('Groups deleted');

        }

    }

})();

