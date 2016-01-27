/**
 * seneschal.module.js
 * Created by anonymous on 08/12/15 17:00.
 */

(function() {
    'use strict';

    angular
        .module('seneschal', ['jwtAuth']);

    angular
        .module('jwtAuth', [
            /* Shared */
            'appFoundation',
            'widgets'
        ]);

})();