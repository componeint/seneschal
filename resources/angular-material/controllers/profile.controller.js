/**
 * profile.controller.js
 * Created by anonymous on 27/02/16 0:56.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state', 'jwtAuthService'];

    /* @ngInject */
    function ProfileController($state, jwtAuthService) {

        var vm     = this;

        vm.signout = signout;


        activate();

        ////////////////

        function activate() {
            //
        }

        function signout() {

            jwtAuthService.signout().then(function() {
                $state.go('jwtauth.signin');
            });

        }

    }

})();

