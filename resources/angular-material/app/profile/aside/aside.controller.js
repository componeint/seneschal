/**
 * aside.controller.js
 * Created by anonymous on 27/02/16 1:43.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('ProfileAsideController', ProfileAsideController);

    ProfileAsideController.$inject = ['$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function ProfileAsideController($timeout, $mdSidenav, $log) {

        var vm   = this;

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

