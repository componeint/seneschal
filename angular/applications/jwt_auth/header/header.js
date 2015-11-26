/**
 * Created by anonymoussc on 26/11/15 19:51.
 */

(function() {
    'use strict';

    angular.module('app.controllers').controller('JwtAuthHeaderCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.$watch(function() {
            return $rootScope.title;
        }, function(newPage) {
            $scope.title = newPage || 'Applications';
        });

    }]);
})();