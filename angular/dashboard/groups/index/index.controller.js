/**
 * Created by anonymous on 29/12/15 21:13.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupIndexController', GroupIndexController);

    GroupIndexController.$inject = ['$scope', 'groupsService'];

    /* @ngInject */
    function GroupIndexController($scope, groupsService) {
        var vm   = this;
        vm.title = 'GroupIndexController';

        activate();

        ////////////////

        function activate() {
            $scope.group = groupsService.lists;

            // Mark a specific record as read-only
            $scope.$on('flComplete', function($e, $args) {
                angular.forEach($scope.group.fl.records, function(record) {
                    if ((record.id === 2) && (record.name === 'Admins')) {
                        record.readonly = true;
                        return;
                    }
                });
            });
        }
    }

})();

