/**
 * edit-password.controller.js
 * Created by anonymous on 21/02/16 23:22.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('UsersEditPasswordController', UsersEditPasswordController);

    UsersEditPasswordController.$inject = ['$stateParams'];

    /* @ngInject */
    function UsersEditPasswordController($stateParams) {

        var vm = this;

        vm.data = {id: $stateParams.id};


        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

