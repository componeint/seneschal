/**
 * Created by anonymoussc on 26/11/15 18:13.
 */

(function() {
    'use strict';

    angular.module('app.controllers').controller('StaticpageLeftCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close().then(function() {
                // $log.debug("close LEFT is done");
            });
        };
    }]);
})();
