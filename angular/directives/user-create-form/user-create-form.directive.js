/**
 * user-create-form.directive.js
 * Created by anonymous on 31/12/15 13:00.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('userCreateForm', userCreateForm);

    userCreateForm.$inject = [];

    /* @ngInject */
    function userCreateForm() {
        var directive = {
            bindToController: true,
            controller      : UserCreateFormController,
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

    UserCreateFormController.$inject = ['ToastService', '$state', 'Users'];

    /* @ngInject */
    function UserCreateFormController(ToastService, $state, Users) {
        var vm    = this;
        vm.create = create;

        activate();

        ////////////////

        function activate() {
            //
        }

        function create() {
            vm.formData = {
                username             : vm.username,
                email                : vm.email,
                password             : vm.password,
                password_confirmation: vm.password_confirmation,
                activate             : vm.activate
            };

            Users.post(vm.formData).then(function(response) {
                $state.go('dashboard.users');
                ToastService.show('Data added successfully.');
            });
        }

    }

})();

