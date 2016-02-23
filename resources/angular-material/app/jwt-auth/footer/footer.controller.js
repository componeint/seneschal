/**
 * footer.controller.js
 * Created by anonymous on 26/11/15 19:33.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .controller('JwtAuthFooterController', JwtAuthFooterController);

    JwtAuthFooterController.$inject = [];

    /* @ngInject */
    function JwtAuthFooterController() {
        var vm   = this;
        vm.title = 'JwtAuthFooterController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

