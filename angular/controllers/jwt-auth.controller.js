/**
 * Created by anonymoussc on 03/12/15 4:55.
 */

(function() {
    'use strict';

    angular
        .module('components.controllers')
        .controller('JwtAuthController', JwtAuthController);

    JwtAuthController.$inject = [];

    /* @ngInject */
    function JwtAuthController() {
        var vm   = this;
        vm.title = 'JwtAuthController';

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

                $state.go('app.home');
            });
        }
    }

})();

