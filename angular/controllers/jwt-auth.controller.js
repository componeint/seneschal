/**
 * Created by anonymous on 03/12/15 4:55.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthController', JwtAuthController);

    JwtAuthController.$inject = ['$http', '$auth', '$rootScope', '$state', 'jwtAuthService'];

    /* @ngInject */
    function JwtAuthController($http, $auth, $rootScope, $state, jwtAuthService) {
        var vm   = this;
        vm.title = 'JwtAuthController';

        vm.users;
        vm.error;

        vm.getUsers = getUsers;
        vm.signout  = signout;

        activate();

        ////////////////

        function activate() {

        }

        function getUsers() {
            return jwtAuthService.getUsers()
                .success(function(users) {
                    vm.users = users;
                    console.log(users);
                })
                .error(function(error) {
                    vm.error = error;
                    console.log(error);
                });
        }

        function signout() {
            jwtAuthService.signout().then(function() {
                $state.go('jwtauth.signin');
            });
            console.log('sign-out');
        }
    }

})();

