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

        /*
        activate();

        ////////////////

        function activate() {
            return getUsers().then(function() {
                console.log('Activated getUsers.');
            });

        }
        */

        function getUsers() {
            return jwtAuthService.getUsers()
                .success(function(users) {
                    vm.users = users;
                    console.log(users);
                    //return vm.users;
                })
                .error(function(error) {
                    vm.error = error;
                    console.log(error);
                });
        }

        function signout() {
            jwtAuthService.signout();
            console.log('sign-out' + jwtAuthService.signout());
            $state.go('jwtauth.signin');
        }

        /*
         vm.users;
         vm.error;

         vm.getUsers = getUsers;
         vm.signout  = signout;

         function getUsers() {
         $http.get('api/authenticate').success(function(users) {
         vm.users = users;
         }).error(function(error) {
         vm.error = error;
         });
         }

         function signout() {
         $auth.logout().then(function() {
         localStorage.removeItem('user');
         $rootScope.authenticated = false;
         $rootScope.currentUser   = null;
         $state.go('jwtauth.signin');
         });
         }
         */
    }

})();

