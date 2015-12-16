/**
 * Created by anonymous on 16/12/15 14:30.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UserEditController', UserEditController);

    UserEditController.$inject = [''];

    /* @ngInject */
    function UserEditController() {
        var vm   = this;
        vm.title = 'UserEditController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

