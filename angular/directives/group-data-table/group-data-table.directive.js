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
            //scope           : {},
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
            $http.get('desserts.json').then(function(desserts) {
                $scope.desserts = desserts.data;
                // $timeout(function () {
                //   $scope.desserts = desserts.data;
                // }, 1000);
            });

        }

        $scope.selected = [];

        $scope.query = {
            order: 'name',
            limit: 5,
            page : 1
        };

        $scope.columns = [
            {
                name   : 'Dessert',
                orderBy: 'name',
                unit   : '100g serving'
            },
            {
                descendFirst: true,
                name        : 'Type',
                orderBy     : 'type'
            },
            {
                name   : 'Calories',
                numeric: true,
                orderBy: 'calories.value'
            },
            {
                name   : 'Fat',
                numeric: true,
                orderBy: 'fat.value',
                unit   : 'g'
            }, /* {
             name: 'Carbs',
             numeric: true,
             orderBy: 'carbs.value',
             unit: 'g'
             }, */
            {
                name   : 'Protein',
                numeric: true,
                orderBy: 'protein.value',
                trim   : true,
                unit   : 'g'
            }, /* {
             name: 'Sodium',
             numeric: true,
             orderBy: 'sodium.value',
             unit: 'mg'
             }, {
             name: 'Calcium',
             numeric: true,
             orderBy: 'calcium.value',
             unit: '%'
             }, */
            {
                name   : 'Iron',
                numeric: true,
                orderBy: 'iron.value',
                unit   : '%'
            }/*,
             {
             name   : 'Comments',
             orderBy: 'comment'
             }*/
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

