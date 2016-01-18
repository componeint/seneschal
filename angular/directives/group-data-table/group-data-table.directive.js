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
        vm.loadStuff  = loadStuff;
        vm.onReorder  = onReorder;
        vm.destroy    = destroy;

        activate();

        ////////////////

        function activate() {
            $http.get('api/groups').then(function(response) {
                vm.records = response.data.data;
                // console.log(response.data);
                // $timeout(function () {
                //   vm.records = responses.data;
                // }, 1000);
            }, function(error) {
                console.log('error: ' + error);
            });
            /*Groups.getList().then(function(response) {
                vm.records = response;
                // console.log(response);
                //ToastService.show('Refreshed');
            }, function(error) {
                console.log('error: ' + error);
            });*/
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
            Groups.remove(id).then(function() {
                // vm.records = _.without(vm.records.data[id], id);
                // activate();
                ToastService.show('Group has been successfully deleted.');
            });

        }

    }

})();

