/**
 * show.controller.js
 * Created by anonymous on 29/12/15 21:07.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupShowController', GroupShowController);

    GroupShowController.$inject = ['$stateParams', 'Groups'];

    /* @ngInject */
    function GroupShowController($stateParams, Groups) {
        var vm     = this;
        vm.groupId = $stateParams.groupId;

        activate();

        ////////////////

        function activate() {
            Groups.get(vm.groupId);
        }
    }

})();

