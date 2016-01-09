/**
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
            //bindToController: true,
            controller : GroupDataTableController,
            //controllerAs    : 'vm',
            link       : link,
            restrict   : 'EA',
            scope      : {},
            templateUrl: function(elem, attr) {
                return attr.template;
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    GroupDataTableController.$inject = ['$http', '$mdEditDialog', '$q', '$timeout', '$scope'];

    /* @ngInject */
    function GroupDataTableController($http, $mdEditDialog, $q, $timeout, $scope) {
        var vm             = this;
        $scope.editComment = editComment;
        $scope.getTypes    = getTypes;
        $scope.onPaginate  = onPaginate;
        $scope.deselect    = deselect;
        $scope.log         = log;
        $scope.loadStuff   = loadStuff;
        $scope.onReorder   = onReorder;

        activate();

        ////////////////

        function activate() {
            $http.get('api/groups').then(function(responses) {
                $scope.records = responses.data;
                // $timeout(function () {
                //   $scope.records = responses.data;
                // }, 1000);
            });

        }

        $scope.selected = [];

        $scope.query = {
            order: 'id',
            limit: 5,
            page : 1
        };

        $scope.columns = [
            {
                name   : 'Name',
                orderBy: 'name'
            },
            {
                name        : 'Permissions',
                orderBy     : 'permissions'
            }
        ];

        function editComment(event, dessert) {
            event.stopPropagation();

            var promise = $mdEditDialog.large({
                // messages: {
                //   test: 'I don\'t like tests!'
                // },
                modelValue : dessert.comment,
                placeholder: 'Add a comment',
                save       : function(input) {
                    dessert.comment = input.$modelValue;
                },
                targetEvent: event,
                title      : 'Add a comment',
                validators : {
                    'md-maxlength': 30
                }
            });

            promise.then(function(ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function() {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        }

        function getTypes() {
            return ['Candy', 'Ice cream', 'Other', 'Pastry'];
        }

        function onPaginate(page, limit) {
            // $scope.$broadcast('md.table.deselect');

            console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
            console.log('Page: ' + page + ' Limit: ' + limit);

            $scope.promise = $timeout(function() {

            }, 2000);
        }

        function deselect(item) {
            console.log(item.name, 'was deselected');
        }

        function log(item) {
            console.log(item.name, 'was selected');
        }

        function loadStuff() {
            $scope.promise = $timeout(function() {

            }, 2000);
        }

        function onReorder(order) {

            console.log('Scope Order: ' + $scope.query.order);
            console.log('Order: ' + order);

            $scope.promise = $timeout(function() {

            }, 2000);
        }

    }

})();

