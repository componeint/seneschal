/**
 * show.controller.js
 * Created by anonymous on 16/12/15 14:38.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('UsersShowController', UsersShowController);

    UsersShowController.$inject = ['$stateParams', 'Users'];

    /* @ngInject */
    function UsersShowController($stateParams, Users) {
        var vm  = this;
        vm.data = {id: $stateParams.id};

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

