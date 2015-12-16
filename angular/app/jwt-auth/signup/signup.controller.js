/**
 * Created by anonymous on 10/12/15 21:24.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthSignupController', JwtAuthSignupController);

    JwtAuthSignupController.$inject = ['$location', '$state', '$auth', 'toastr'];

    /* @ngInject */
    function JwtAuthSignupController($location, $state, $auth, toastr) {
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
                    //$location.path('/');
                    $state.go('jwtauth.home');
                    toastr.info('You have successfully created a new account and have been signed-in');
                })
                .catch(function(response) {
                    toastr.error(response.data.message);
                });
        }
    }

})();

/*angular.module('jwtAuth')
 .controller('SignupCtrl', function($scope, $location, $auth, toastr) {
 $scope.signup = function() {
 $auth.signup($scope.user)
 .then(function(response) {
 $auth.setToken(response);
 $location.path('/');
 toastr.info('You have successfully created a new account and have been signed-in');
 })
 .catch(function(response) {
 toastr.error(response.data.message);
 });
 };
 });*/