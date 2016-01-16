/**
 * show.controller.js
 * Created by anonymous on 29/12/15 21:07.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupsShowController', GroupsShowController);

    GroupsShowController.$inject = ['$stateParams', 'API', 'Groups'];

    /* @ngInject */
    function GroupsShowController($stateParams, API, Groups) {
        var vm     = this;
        vm.groupId = $stateParams.groupId;

        activate();

        ////////////////

        function activate() {
            Groups.get(vm.groupId).then(function(response) {
                vm.groups = response.data;
            });
        }
    }

})();

