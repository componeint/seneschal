/**
 * sidenav.controller.js
 * Created by anonymous on 03/01/16 4:41.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthSidenavController', JwtAuthSidenavController);

    JwtAuthSidenavController.$inject = ['$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function JwtAuthSidenavController($timeout, $mdSidenav, $log) {
        var vm   = this;
        vm.close = function() {
            $mdSidenav('left').close().then(function() {
                // $log.debug("close LEFT is done");
            });
        };

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

