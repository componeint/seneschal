/**
 * show.controller.js
 * Created by anonymous on 16/12/15 14:38.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UserShowController', UserShowController);

    UserShowController.$inject = ['$stateParams', 'Users'];

    /* @ngInject */
    function UserShowController($stateParams, Users) {
        var vm    = this;
        vm.userId = $stateParams.id;

        activate();

        ////////////////

        function activate() {
            Users.get(vm.userId).then(function(response) {
                vm.users = response.data;
            });
        }
    }

})();

