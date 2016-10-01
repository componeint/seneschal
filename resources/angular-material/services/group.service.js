/**
 * groups.service
 * Created by @anonymoussc on 16/01/16 22:31.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('Groups', Groups);

    Groups.$inject = ['API'];

    /* @ngInject */
    function Groups(API) {
        return API.all('groups');
    }

})();


/**
 * group.service.js
 * Created by @anonymoussc on 01/02/16 6:04.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('group', group);

    group.$inject = ['API'];

    /* @ngInject */
    function group(API) {
        var service = {
            index  : index,
            create : create,
            store  : store,
            show   : show,
            edit   : edit,
            update : update,
            destroy: destroy,
            crush  : crush
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

        function edit(id) {
            return API.one('groups', id).getList('edit');
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

