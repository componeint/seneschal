/**
 * users-activate.controller.js
 * Created by anonymous on 22/02/16 17:19.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('JwtAuthUsersActivateController', JwtAuthUsersActivateController);

    // jscs:disable maximumLineLength
    JwtAuthUsersActivateController.$inject = ['$stateParams', 'API', 'Toast', '$state', '$timeout'];
    // jscs:enable maximumLineLength

    /* @ngInject */
    function JwtAuthUsersActivateController($stateParams, API, Toast, $state, $timeout) {

        // noinspection JSUnusedAssignment
        // var vm = this;

        /* @Init */
        activate();

        ////////////////

        function activate() {

            // jscs:disable maximumLineLength
            API.one('users', 'activate').one($stateParams.hash, $stateParams.code).get().then(function() {

                // jscs:enable maximumLineLength

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

            });

        }

    }

})();

