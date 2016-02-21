/**
 * edit.controller.js
 * Created by anonymous on 29/12/15 21:09.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupsEditController', GroupsEditController);

    GroupsEditController.$inject = ['$stateParams', 'Groups'];

    /* @ngInject */
    function GroupsEditController($stateParams, Groups) {
        var vm  = this;
        vm.data = {id: $stateParams.id};

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

