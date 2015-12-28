/**
 * Created by anonymous on 16/12/15 14:35.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UserIndexController', UserIndexController);

    UserIndexController.$inject = ['$scope', 'phonesService'];

    /* @ngInject */
    function UserIndexController($scope, phonesService) {
        var vm   = this;
        vm.title = 'UserIndexController';

        activate();

        ////////////////

        function activate() {
            $scope.phones = phonesService.phone;
            // Mark a specific record as read-only
            $scope.$on('flComplete', phonesService.flComplete);
        }
    }

})();

