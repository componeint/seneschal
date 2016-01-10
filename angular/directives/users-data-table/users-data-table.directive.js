/**
 * Created by anonymous on 09/01/16 9:48.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('usersDataTable', usersDataTable);

    usersDataTable.$inject = [];

    /* @ngInject */
    function usersDataTable() {
        var directive = {
            bindToController: true,
            controller      : UsersDataTableController,
            controllerAs    : 'vm',
            link            : link,
            restrict        : 'A',
            scope           : {}
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    UsersDataTableController.$inject = [''];

    /* @ngInject */
    function UsersDataTableController() {

    }

})();

