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

    GroupDataTableController.$inject = ['$http', '$mdEditDialog', '$q', '$timeout', 'Groups', 'ToastService', '$state'];

    /* @ngInject */
    function GroupDataTableController($http, $mdEditDialog, $q, $timeout, Groups, ToastService, $state) {
        var vm        = this;
        vm.onPaginate = onPaginate;
        vm.deselect   = deselect;
        vm.log        = log;
        vm.loadStuff  = loadStuff;
        vm.onReorder  = onReorder;
        vm.destroy    = destroy;

        activate();

        ////////////////

        function activate() {
            /*$http.get('api/groups').then(function(response) {
                vm.records = response.data.data;
                // console.log(response.data);
                // $timeout(function () {
                //   vm.records = responses.data;
                // }, 1000);
            }, function(error) {
                console.log('error: ' + error);
            });*/
            Groups.getList().then(function(response) {
                vm.records = response;
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

        function loadStuff() {
            $timeout(function() {
                activate();

                /*
                Groups.getList().then(function(response) {
                    vm.records = response;
                    console.log(response);
                    ToastService.show('Refreshed');
                });
                */

            }, 2000);
        }

        function onReorder(order) {

            // console.log('Scope Order: ' + vm.query.order);
            // console.log('Order: ' + order);

            vm.promise = $timeout(function() {

            }, 2000);
        }

        function destroy(id) {

            // Here we use then to resolve the promise.
            Groups.getList().then(function(response) {
                vm.records = response;
                var groupWithId = _.find(response, function(group) {
                    return group.id === id;
                });

                // groupWithId.name = '';
                // groupWithId.put();

                // Alternatively delete the element from the list when finished
                groupWithId.remove().then(function() {
                    // Updating the list and removing the user after the response is OK.
                    vm.records = _.without(vm.records, groupWithId);
                    vm.selected = [];
                    //$state.go('dashboard.groups');
                    ToastService.show('Group has been successfully deleted.');
                });

            });

            /*
            Groups.remove(id).then(function() {
                // vm.records = _.without(vm.records.data[id], id);
                // activate();
                ToastService.show('Group has been successfully deleted.');
            }, function(error) {
                console.log('Error : ' + error.status_code + ' : ' + error.message);
            });
            */

        }

    }

})();

