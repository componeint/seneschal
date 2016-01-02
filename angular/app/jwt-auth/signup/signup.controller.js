/**
 * Created by anonymous on 10/12/15 21:24.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthSignupController', JwtAuthSignupController);

    JwtAuthSignupController.$inject = [];

    /* @ngInject */
    function JwtAuthSignupController() {
        var vm    = this;
        vm.title  = 'JwtAuthSignupController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

