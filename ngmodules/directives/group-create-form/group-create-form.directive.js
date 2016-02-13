/**
 * group-create-form.directive.js
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
            controllerAs    : 'ctrl',
            link            : link,
            restrict        : 'EA',
            scope           : {
                successStateRedirect: '@'
            },
            templateUrl     : function(elem, attr) {
                return attr.template;
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    GroupCreateFormController.$inject = ['ToastService', '$state', 'Groups'];

    /* @ngInject */
    function GroupCreateFormController(ToastService, $state, Groups) {
        var vm         = this;
        vm.permissions = {};
        vm.create      = create;

        activate();

        ////////////////

        function activate() {
            //
        }

        function create() {
            vm.formData = {
                name       : vm.name,
                permissions: vm.permissions
            };

            var stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.groups' : vm.successStateRedirect;

            Groups.post(vm.formData).then(function(response) {
                $state.go(stateRedirect);
                ToastService.show('Group added');
            });
        }

    }

})();

