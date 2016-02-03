/**
 * groups.service
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
        return API.all('groups');
    }

})();


/**
 * group.service.js
 * Created by anonymous on 01/02/16 6:04.
 */