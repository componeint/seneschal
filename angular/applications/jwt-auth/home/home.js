/**
 * Created by anonymoussc on 26/11/15 19:55.
 */

(function() {
    'use strict';

    angular
        .module('components.controllers')
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

