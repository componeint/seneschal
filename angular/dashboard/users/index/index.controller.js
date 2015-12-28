/**
 * Created by anonymous on 16/12/15 14:35.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UserIndexController', UserIndexController);

    UserIndexController.$inject = ['$scope', 'usersService'];

    /* @ngInject */
    function UserIndexController($scope, usersService) {
        var vm   = this;
        vm.title = 'UserIndexController';

        activate();

        ////////////////

        function activate() {
            $scope.user = usersService.user;
            // Mark a specific record as read-only
            $scope.$on('flComplete', usersService.flComplete);
        }
    }

})();

