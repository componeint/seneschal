/**
 * Created by anonymous on 02/12/15 5:49.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthSigninController', JwtAuthSigninController);

    JwtAuthSigninController.$inject = ['$auth', '$state', '$http', '$rootScope'];

    /* @ngInject */
    function JwtAuthSigninController($auth, $state, $http, $rootScope) {
        var vm        = this;
        vm.title      = 'JwtAuthSigninController';
        vm.loginError = false;
        vm.loginErrorText;
        vm.login      = login;

        /*
         activate();

         ////////////////

         function activate() {
         //
         }
         */

        function login() {
            var
                credentials = {
                    email   : vm.email,
                    password: vm.password
                };

            $auth.login(credentials)
                .then(function() {
                    return $http.get('api/authenticate/user');
                }, function(error) {
                    vm.loginError     = true;
                    vm.loginErrorText = error.data.error;
                })
                .then(function(response) {
                    var user                 = JSON.stringify(response.data.user);
                    localStorage.setItem('user', user);
                    $rootScope.authenticated = true;
                    $rootScope.currentUser   = response.data.user;
                    $state.go('jwtauth.home');
                });
        }
    }

})();

