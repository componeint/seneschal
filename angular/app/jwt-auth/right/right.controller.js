/**
 * Created by anonymous on 26/11/15 20:27.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthRightController', JwtAuthRightController);

    JwtAuthRightController.$inject = ['$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function JwtAuthRightController($timeout, $mdSidenav, $log) {
        var vm   = this;
        vm.title = 'JwtAuthRightController';
        vm.close = function() {
            $mdSidenav('right').close().then(function() {
                // $log.debug("close RIGHT is done");
            });
        };

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

