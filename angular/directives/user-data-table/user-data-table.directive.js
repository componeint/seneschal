/**
 * user-data-table.directive.js
 * Created by anonymous on 09/01/16 9:48.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('userDataTable', userDataTable);

    userDataTable.$inject = [];

    /* @ngInject */
    function userDataTable() {
        var directive = {
            bindToController: true,
            controller      : UserDataTableController,
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

    UserDataTableController.$inject = ['$http', '$mdEditDialog', '$q', '$timeout', 'Users', 'ToastService'];

    /* @ngInject */
    function UserDataTableController($http, $mdEditDialog, $q, $timeout, Users, ToastService) {
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
            /*
            $http.get('api/users').then(function(responses) {
                vm.records = responses.data;
                // $timeout(function () {
                //   vm.records = responses.data;
                // }, 1000);
            });
            */
            Users.getList().then(function(response) {
                vm.records = response;
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
                name   : 'Username',
                orderBy: 'username'
            },
            {
                name   : 'Email',
                orderBy: 'email'
            },
            {
                name   : 'Permissions',
                orderBy: 'permissions'
            },
            {
                name   : 'Activated',
                orderBy: 'activated'
            },
            {
                name   : 'Status',
                orderBy: 'status'
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
            vm.promise = $timeout(function() {

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
            Users.getList().then(function(response) {
                vm.records = response;
                var listWithId = _.find(response, function(list) {
                    return list.id === id;
                });

                // Alternatively delete the element from the list when finished
                listWithId.remove().then(function() {
                    // Updating the list and removing the user after the response is OK.
                    vm.records = _.without(vm.records, listWithId);
                    vm.selected = [];
                    ToastService.show('User deleted.');
                });

            });

        }
    }

})();

