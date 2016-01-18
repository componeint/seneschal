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
            scope           : {},
            templateUrl     : function(elem, attr) {
                return attr.template;
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    GroupCreateFormController.$inject = ['API', 'ToastService', '$state', 'Groups'];

    /* @ngInject */
    function GroupCreateFormController(API, ToastService, $state, Groups) {
        var vm                = this;
        vm.defaultPermissions = [
            {name: 'admin', value: 1},
            {name: 'users', value: 1}
        ];
        vm.selected           = [];
        vm.toggle             = toggle;
        vm.exists             = exists;
        vm.groupCreate        = groupCreate;

        activate();

        ////////////////

        function activate() {
            //
        }

        function toggle(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        }

        function exists(item, list) {
            return list.indexOf(item) > -1;
        }

        function groupCreate() {
            vm.formData = {
                name       : vm.name,
                permissions: vm.selected
            };

            Groups.post(vm.formData).then(function(response) {
                $state.go('dashboard.groups');
                ToastService.show('Post added successfully');
            });
        }

    }

})();

