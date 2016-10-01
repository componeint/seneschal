/**
 * user-data-table.directive.js
 * Created by anonymous on 09/01/16 9:48.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('userDataTable', userDataTable);

    userDataTable.$inject = [];

    /* @ngInject */
    function userDataTable() {

        var
            directive = {
                bindToController: true,
                controller      : UserDataTableController,
                controllerAs    : '$ctrl',
                link            : link,
                restrict        : 'EA',
                scope           : {},
                templateUrl     : function(elem, attr) {
                    return attr.template;
                }
            };

        return directive;

        function link(scope, element, attrs) {
            //
        }

    }

    UserDataTableController.$inject = ['API', '$mdEditDialog', '$q', '$timeout', 'Toast', 'logService'];

    /* @ngInject */
    function UserDataTableController(API, $mdEditDialog, $q, $timeout, Toast, logService) {

        var vm    = this;
        var Users = API.all('users');

        vm.selected   = [];
        vm.query      = {
            order: 'id',
            limit: 5,
            page : 1
        };
        vm.columns    = [
            {
                name   : 'Username',
                orderBy: 'username'
            },
            {
                name   : 'Email',
                orderBy: 'email'
            },
            {
                name   : 'Activated',
                orderBy: 'activated'
            },
            {
                name   : 'Status',
                orderBy: 'status'
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
        vm.suspend    = suspend;
        vm.unsuspend  = unsuspend;
        vm.ban        = ban;
        vm.unban      = unban;


        activate();

        ////////////////

        function activate() {

            Users.getList().then(function(response) {
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

            }, 2000);

        }

        function deselect(item) {
            // console.log(item.name, 'was deselected');
        }

        function log(item) {
            // console.log(item.name, 'was selected');
        }

        function loading() {

            Users.getList().then(function(response) {
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

            listWithId.remove().then(function() {

                var index = vm.lists.indexOf(listWithId);

                if (index > -1) {
                    vm.lists.splice(index, 1);
                }

                vm.selected = [];

                Toast.show('User deleted');

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

            Toast.show('Users deleted');

        }

        function suspend(id) {

            API.one('users', id).getList('suspend').then(function(response) {
                loading();
            });

        }

        function unsuspend(id) {

            API.one('users', id).getList('unsuspend').then(function(response) {
                loading();
            });

        }

        function ban(id) {

            API.one('users', id).getList('ban').then(function(response) {
                loading();
            });

        }

        function unban(id) {

            API.one('users', id).getList('unban').then(function(response) {
                loading();
            });

        }

    }

})();

