/**
 * Created by anonymous on 26/11/15 19:55.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthHomeController', JwtAuthHomeController);

    JwtAuthHomeController.$inject = ['userData', '$log'];

    /* @ngInject */
    function JwtAuthHomeController(userData, $log) {
        var vm      = this;
        vm.getUsers = getUsers;

        activate();

        ////////////////

        function activate() {
            //
        }

        function getUsers() {
            return userData.get().then(function(response) {
                vm.users = response;
                //$log.debug(vm.users);
            }).catch(function(error) {
                vm.error = error;
                $log.debug('Error with status code', error.status);
                $log.debug(error);
            });
        }
    }

})();

