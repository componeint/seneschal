/**
 * users-activate.controller
 * Created by anonymous on 22/02/16 17:19.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('JwtAuthUsersActivateController', JwtAuthUsersActivateController);

    JwtAuthUsersActivateController.$inject = ['$stateParams', 'API', 'logService', 'Toast', '$state', '$timeout'];

    /* @ngInject */
    function JwtAuthUsersActivateController($stateParams, API, logService, Toast, $state, $timeout) {

        var vm = this;

        vm.hash = {hash: $stateParams.hash};
        vm.code = {code: $stateParams.code};


        activate();

        ////////////////

        function activate() {

            API.one('users', 'activate').one($stateParams.hash, $stateParams.code).get().then(function(response) {
                // console.log(response);

                Toast.show('Activation success');

                $timeout(function() {
                    $state.go('client.home');
                }, 7000);

            }, function(error) {

                if (error.data.error) {
                    Toast.error(error.data.error);
                } else {
                    Toast.error('Invalid credential');
                }
                // Toast.error(error.data.error);


            });

        }

    }

})();

