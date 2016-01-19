/**
 * users.service.js
 * Created by anonymous on 16/01/16 22:43.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('Users', Users);

    Users.$inject = ['API'];

    /* @ngInject */
    function Users(API) {
        return API.all('users');
    }

})();

