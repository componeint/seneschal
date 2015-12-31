/**
 * Created by anonymous on 10/12/15 21:24.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthSignupController', JwtAuthSignupController);

    JwtAuthSignupController.$inject = ['$location', '$state', '$auth', 'toastService'];

    /* @ngInject */
    function JwtAuthSignupController($location, $state, $auth, toastService) {
        var vm    = this;
        vm.title  = 'JwtAuthSignupController';
        vm.user;
        vm.signup = signup;

        activate();

        ////////////////

        function activate() {
            //
        }

        function signup() {
            $auth.signup(vm.user)
                .then(function(response) {
                    $auth.setToken(response);
                    $state.go('jwtauth.home');
                    toastService.show('You have successfully created a new account and have been signed-in');
                })
                .catch(function(response) {
                    console.log(response.data.message);
                    toastService.error(response.data.message);
                });
        }
    }

})();

