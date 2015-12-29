/**
 * Created by anonymous on 29/12/15 21:07.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupShowController', GroupShowController);

    GroupShowController.$inject = [];

    /* @ngInject */
    function GroupShowController() {
        var vm   = this;
        vm.title = 'GroupShowController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

