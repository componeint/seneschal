/**
 * Created by anonymous on 29/12/15 21:02.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupCreateController', GroupCreateController);

    GroupCreateController.$inject = [];

    /* @ngInject */
    function GroupCreateController() {
        var vm   = this;
        vm.title = 'GroupCreateController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

