/**
 * groups.service.js
 * Created by anonymous on 16/01/16 22:31.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('Groups', Groups);

    Groups.$inject = ['API'];

    /* @ngInject */
    function Groups(API) {
        return API.service('groups');
    }

})();

