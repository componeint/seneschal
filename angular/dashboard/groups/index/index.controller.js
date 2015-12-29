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
            $scope.group = groupsService.group;
            // Mark a specific record as read-only
            $scope.$on('flComplete', groupsService.flComplete);
        }
    }

})();

