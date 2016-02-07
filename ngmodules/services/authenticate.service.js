/**
 * authenticate.service.js
 * Created by anonymous on 07/02/16 18:48.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('Authenticate', Authenticate);

    Authenticate.$inject = ['API'];

    /* @ngInject */
    function Authenticate(API) {
        return API.all('authenticate');
    }

})();


/**
 * authenticate.service.js
 * Created by anonymous on 31/01/16 22:45.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('auth', auth);

    auth.$inject = ['$http', '$auth'];

    /* @ngInject */
    function auth($http, $auth) {
        var service = {
            authenticate        : authenticate,
            getAuthenticatedUser: getAuthenticatedUser,
            create              : create,
            store               : store,
            destroy             : destroy
        };
        return service;

        ////////////////

        function authenticate(credentials) {
            return $auth.login(credentials);
        }

        function getAuthenticatedUser() {
            return $http.get('api/authenticate/user');
        }

        function create() {
            //
        }

        function store() {
            //
        }

        function destroy() {
            //
        }
    }

})();

