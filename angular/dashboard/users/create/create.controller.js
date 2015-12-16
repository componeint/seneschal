/**
 * Created by anonymous on 16/12/15 14:12.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UserCreateController', UserCreateController);

    UserCreateController.$inject = [];

    /* @ngInject */
    function UserCreateController() {
        var vm   = this;
        vm.title = 'UserCreateController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

