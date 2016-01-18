/**
 * show.controller.js
 * Created by anonymous on 29/12/15 21:07.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupsShowController', GroupsShowController);

    GroupsShowController.$inject = ['$stateParams', 'Groups'];

    /* @ngInject */
    function GroupsShowController($stateParams, Groups) {
        var vm     = this;
        vm.groupId = $stateParams.id;

        activate();

        ////////////////

        function activate() {
            Groups.get(vm.groupId).then(function(response) {
                vm.groups = response.data;
            });
        }
    }

})();

