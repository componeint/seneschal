/**
 * show.controller.js
 * Created by anonymous on 29/12/15 21:07.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('GroupsShowController', GroupsShowController);

    GroupsShowController.$inject = ['$stateParams', 'Groups'];

    /* @ngInject */
    function GroupsShowController($stateParams, Groups) {
        var vm  = this;
        vm.data = {id: $stateParams.id};

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

