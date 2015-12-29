/**
 * Created by anonymous on 29/12/15 21:13.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('GroupIndexController', GroupIndexController);

    GroupIndexController.$inject = ['$scope'];

    /* @ngInject */
    function GroupIndexController($scope) {
        var vm   = this;
        vm.title = 'GroupIndexController';

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

