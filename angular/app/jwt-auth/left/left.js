/**
 * Created by anonymous on 26/11/15 20:24.
 */

(function() {
    'use strict';

    angular.module('jwtAuth').controller('JwtAuthLeftController', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close().then(function() {
                // $log.debug("close LEFT is done");
            });
        };
    }]);
})();
