/**
 * users.service
 * Created by @anonymoussc on 16/01/16 22:43.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('Users', Users);

    Users.$inject = ['API'];

    /* @ngInject */
    function Users(API) {
        return API.all('users');
    }

})();


/**
 * user.service
 * Created by @anonymoussc on 01/02/16 6:10.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('user', userFactory);

    userFactory.$inject = [];

    /* @ngInject */
    function userFactory() {
        var service = {
            index                 : index,
            create                : create,
            store                 : store,
            show                  : show,
            edit                  : edit,
            update                : update,
            destroy               : destroy,
            updateGroupMemberships: updateGroupMemberships,
            changePassword        : changePassword,
            suspend               : suspend,
            unsuspend             : unsuspend,
            ban                   : ban,
            unban                 : unban
        };
        return service;

        ////////////////

        function index() {
            //
        }

        function create() {
            //
        }

        function store() {
            //
        }

        function show() {
            //
        }

        function edit() {
            //
        }

        function update() {
            //
        }

        function destroy() {
            //
        }

        function updateGroupMemberships() {
            //
        }

        function changePassword() {
            //
        }

        function suspend() {
            //
        }

        function unsuspend() {
            //
        }

        function ban() {
            //
        }

        function unban() {
            //
        }

    }

})();


/**
 * user.service
 * Created by @anonymoussc on 15/12/15 13:51.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('userService', userService);

    userService.$inject = [];

    /* @ngInject */
    function userService() {
        var service = {
            getAll : getAll,
            get    : get,
            find   : find,
            store  : store,
            update : update,
            destroy: destroy,
            crush  : crush
        };
        return service;

        ////////////////

        function getAll() {
            //
        }

        function get() {
            //
        }

        function find() {
            //
        }

        function store() {
            //
        }

        function update() {
            //
        }

        function destroy() {
            //
        }

        function crush() {
            //
        }
    }

})();

