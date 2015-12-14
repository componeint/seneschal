/**
 * Created by anonymous on 26/11/15 19:55.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('JwtAuthHomeController', JwtAuthHomeController);

    JwtAuthHomeController.$inject = [];

    /* @ngInject */
    function JwtAuthHomeController() {
        var vm   = this;
        vm.title = 'JwtAuthHomeController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

