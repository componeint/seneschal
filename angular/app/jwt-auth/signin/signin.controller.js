/**
 * Created by anonymous on 02/12/15 5:49.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthSigninController', JwtAuthSigninController);

    JwtAuthSigninController.$inject = [];

    /* @ngInject */
    function JwtAuthSigninController() {
        var vm        = this;
        vm.title      = 'JwtAuthSigninController';

        activate();

        ////////////////

        function activate() {
            //
        }

    }

})();

