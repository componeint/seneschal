/**
 * Created by anonymoussc on 03/12/15 4:55.
 */

(function() {
    'use strict';

    angular
        .module('components.controllers')
        .controller('JwtAuthController', JwtAuthController);

    JwtAuthController.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];

    /* @ngInject */
    function JwtAuthController($scope, $timeout, $mdSidenav, $log) {
        var vm         = this;
        vm.title       = 'JwtAuthController';
        vm.toggleLeft  = buildDelayedToggler('left');
        vm.toggleRight = buildToggler('right');
        vm.isOpenRight = function() {
            return $mdSidenav('right').isOpen();
        };

        /*
        activate();

        ////////////////

        function activate() {
            //
        }
        */

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        // $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        // $log.debug("toggle " + navID + " is done");
                    });
            };
        }

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = vm,
                    args    = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer       = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
    }

})();

