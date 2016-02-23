/**
 * aside.controller.js
 * Created by anonymous on 03/01/16 5:37.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('JwtAuthAsideController', JwtAuthAsideController);

    JwtAuthAsideController.$inject = ['$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function JwtAuthAsideController($timeout, $mdSidenav, $log) {
        var vm   = this;
        vm.title = 'JwtAuthAsideController';
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

