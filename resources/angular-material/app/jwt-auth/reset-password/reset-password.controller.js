/**
 * reset-password.controller.js
 * Created by anonymous on 24/02/16 3:43.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('JwtAuthResetPasswordController', JwtAuthResetPasswordController);

    JwtAuthResetPasswordController.$inject = ['$stateParams'];

    /* @ngInject */
    function JwtAuthResetPasswordController($stateParams) {

        var vm = this;

        vm.data = {
            hash: $stateParams.hash,
            code: $stateParams.code
        };

        /* @Init */
        activate();

        ////////////////

        function activate() {
            //
        }

    }

})();

