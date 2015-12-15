/**
 * Created by anonymous on 26/11/15 19:55.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthHomeController', JwtAuthHomeController);

    JwtAuthHomeController.$inject = ['userData'];

    /* @ngInject */
    function JwtAuthHomeController(userData) {
        var vm      = this;
        vm.title    = 'JwtAuthHomeController';
        vm.users;
        vm.error;
        vm.getUsers = getUsers;

        activate();

        ////////////////

        function activate() {
            //
        }

        function getUsers() {
            return userData.get()
                .then(function(users) {
                    vm.users = users;
                    console.log('All ok');
                    console.log(users);
                    //return vm.users;
                })
                .catch(function(error) {
                    vm.error = error;
                    console.log('Error with status code', error.status);
                    console.log(error);
                });
        }
    }

})();

