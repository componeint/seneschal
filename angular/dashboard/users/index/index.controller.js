/**
 * index.controller.js
 * Created by anonymous on 16/12/15 14:35.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .controller('UsersIndexController', UsersIndexController);

    UsersIndexController.$inject = [];

    /* @ngInject */
    function UsersIndexController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            //
        }
    }

})();

