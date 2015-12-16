/**
 * Created by anonymous on 16/12/15 14:38.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UserShowController', UserShowController);

    UserShowController.$inject = [''];

    /* @ngInject */
    function UserShowController() {
        var vm   = this;
        vm.title = 'UserShowController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

