/**
 * Created by anonymous on 16/12/15 14:35.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UserIndexController', UserIndexController);

    UserIndexController.$inject = [];

    /* @ngInject */
    function UserIndexController() {
        var vm   = this;
        vm.title = 'UserIndexController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

