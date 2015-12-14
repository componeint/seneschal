/**
 * Created by anonymous on 26/11/15 20:27.
 */

(function() {
    'use strict';

    angular.module('jwtAuth').controller('JwtAuthRightController', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('right').close().then(function() {
                // $log.debug("close RIGHT is done");
            });
        };
    }]);
})();
