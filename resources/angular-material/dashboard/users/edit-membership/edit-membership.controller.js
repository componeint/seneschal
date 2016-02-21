/**
 * edit-membership.controller.js
 * Created by anonymous on 21/02/16 23:21.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UsersEditMembershipController', UsersEditMembershipController);

    UsersEditMembershipController.$inject = [];

    /* @ngInject */
    function UsersEditMembershipController() {

        var vm = this;

        vm.data = {id: $stateParams.id};


        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

