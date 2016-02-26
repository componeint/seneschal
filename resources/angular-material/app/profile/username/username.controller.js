/**
 * username.controller.js
 * Created by anonymous on 27/02/16 1:55.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('ProfileUsernameController', ProfileUsernameController);

    ProfileUsernameController.$inject = ['API', 'logService'];

    /* @ngInject */
    function ProfileUsernameController(API, logService) {

        var vm = this;

        vm.getUsers = getUsers;


        activate();

        ////////////////

        function activate() {
            //
        }

        function getUsers() {

            return API.all('authenticate').getList().then(function(response) {
                vm.users = response;
            }).catch(function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

