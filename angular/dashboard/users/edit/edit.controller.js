/**
 * edit.controller.js
 * Created by anonymous on 16/12/15 14:30.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UserEditController', UserEditController);

    UserEditController.$inject = ['$stateParams', 'Users'];

    /* @ngInject */
    function UserEditController($stateParams, Users) {
        var vm   = this;
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

