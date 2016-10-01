/**
 * profile.service
 * Created by @anonymoussc on 01/02/16 7:21.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('Profile', Profile);

    Profile.$inject = [];

    /* @ngInject */
    function Profile() {
        var service = {
            show          : show,
            edit          : edit,
            update        : update,
            changePassword: changePassword
        };
        return service;

        ////////////////

        function show() {
            //
        }

        function edit() {
            //
        }

        function update() {
            //
        }

        function changePassword() {
            //
        }
    }

})();

