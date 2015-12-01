/**
 * Created by anonymoussc on 02/12/15 5:49.
 */

(function() {
    'use strict';

    angular
        .module('components.controllers')
        .controller('JwtAuthSigninController', JwtAuthSigninController);

    JwtAuthSigninController.$inject = ['$scope'];

    /* @ngInject */
    function JwtAuthSigninController($scope) {
        var vm   = this;
        vm.title = 'JwtAuthSigninController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

