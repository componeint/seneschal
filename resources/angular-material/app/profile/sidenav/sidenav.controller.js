/**
 * sidenav.controller.js
 * Created by anonymous on 27/02/16 1:18.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('ProfileSidenavController', ProfileSidenavController);

    ProfileSidenavController.$inject = ['$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function ProfileSidenavController($timeout, $mdSidenav, $log) {

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

