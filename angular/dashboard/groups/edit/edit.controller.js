/**
 * edit.controller.js
 * Created by anonymous on 29/12/15 21:09.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupEditController', GroupEditController);

    GroupEditController.$inject = ['$stateParams', 'Groups'];

    /* @ngInject */
    function GroupEditController($stateParams, Groups) {
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

