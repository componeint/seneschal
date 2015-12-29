/**
 * Created by anonymous on 29/12/15 21:09.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupEditController', GroupEditController);

    GroupEditController.$inject = [];

    /* @ngInject */
    function GroupEditController() {
        var vm   = this;
        vm.title = 'GroupEditController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

