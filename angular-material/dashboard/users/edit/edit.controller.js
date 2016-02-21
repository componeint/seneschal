/**
 * edit.controller.js
 * Created by anonymous on 16/12/15 14:30.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UsersEditController', UsersEditController);

    UsersEditController.$inject = ['$stateParams', 'Users'];

    /* @ngInject */
    function UsersEditController($stateParams, Users) {
        var vm  = this;
        vm.data = {id: $stateParams.id};

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

