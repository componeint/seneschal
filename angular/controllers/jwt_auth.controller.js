/**
 * Created by anonymoussc on 03/12/15 4:55.
 */

(function() {
    'use strict';

    angular
        .module('components.controllers')
        .controller('JwtAuthController', JwtAuthController);

    JwtAuthController.$inject = [];

    /* @ngInject */
    function JwtAuthController() {
        var vm   = this;
        vm.title = 'JwtAuthController';

    }

})();

