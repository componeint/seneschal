/**
 * Created by anonymous on 03/12/15 4:55.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthController', JwtAuthController);

    JwtAuthController.$inject = ['$state', 'jwtAuthService'];

    /* @ngInject */
    function JwtAuthController($state, jwtAuthService) {
        var vm   = this;
        vm.title = 'JwtAuthController';
        vm.signout  = signout;

        activate();

        ////////////////

        function activate() {

        }

        function signout() {
            jwtAuthService.signout().then(function() {
                $state.go('jwtauth.signin');
            });
            console.log('sign-out');
        }
    }

})();

