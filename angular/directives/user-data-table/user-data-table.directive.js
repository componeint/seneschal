/**
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
            controllerAs    : 'vm',
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

    UserDataTableController.$inject = ['$http', '$mdEditDialog', '$q', '$timeout'];

    /* @ngInject */
    function UserDataTableController($http, $mdEditDialog, $q, $timeout) {
        var vm        = this;
        vm.onPaginate = onPaginate;
        vm.deselect   = deselect;
        vm.log        = log;
        vm.loadStuff  = loadStuff;
        vm.onReorder  = onReorder;

        activate();

        ////////////////

        function activate() {
            $http.get('api/users').then(function(responses) {
                vm.records = responses.data;
                // $timeout(function () {
                //   vm.records = responses.data;
                // }, 1000);
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
            console.log('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.limit);
            console.log('Page: ' + page + ' Limit: ' + limit);

            vm.promise = $timeout(function() {

            }, 2000);
        }

        function deselect(item) {
            console.log(item.name, 'was deselected');
        }

        function log(item) {
            console.log(item.name, 'was selected');
        }

        function loadStuff() {
            vm.promise = $timeout(function() {

            }, 2000);
        }

        function onReorder(order) {

            console.log('Scope Order: ' + vm.query.order);
            console.log('Order: ' + order);

            vm.promise = $timeout(function() {

            }, 2000);
        }
    }

})();
