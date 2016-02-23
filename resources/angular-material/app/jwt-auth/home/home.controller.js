/**
 * home.controller.js
 * Created by anonymous on 26/11/15 19:55.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('JwtAuthHomeController', JwtAuthHomeController);

    JwtAuthHomeController.$inject = ['Authenticate', 'logService'];

    /* @ngInject */
    function JwtAuthHomeController(Authenticate, logService) {

        var vm = this;

        vm.getUsers = getUsers;


        activate();

        ////////////////

        function activate() {
            //
        }

        function getUsers() {

            return Authenticate.getList().then(function(response) {
                vm.users = response;
            }).catch(function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

