/**
 * Created by anonymous on 31/12/15 12:59.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('groupCreateForm', groupCreateForm);

    groupCreateForm.$inject = [];

    /* @ngInject */
    function groupCreateForm() {
        var directive = {
            bindToController: true,
            controller      : GroupCreateFormController,
            controllerAs    : 'vm',
            link            : link,
            restrict        : 'EA',
            scope           : {},
            templateUrl     : function(elem, attr) {
                return attr.template;
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    GroupCreateFormController.$inject = [];

    /* @ngInject */
    function GroupCreateFormController() {
        var vm                = this;
        vm.defaultPermissions = [
            {name: 'admin'},
            {name: 'users'}
        ];

        activate();

        ////////////////

        function activate() {
            //
        }

    }

})();

