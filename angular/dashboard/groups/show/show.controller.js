/**
 * show.controller.js
 * Created by anonymous on 29/12/15 21:07.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupShowController', GroupShowController);

    GroupShowController.$inject = ['$stateParams'];

    /* @ngInject */
    function GroupShowController($stateParams) {
        var vm     = this;
        vm.groupId = $stateParams.groupId;

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

