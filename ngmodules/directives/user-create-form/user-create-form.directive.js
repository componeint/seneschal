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
        var
            directive = {
                bindToController: true,
                controller      : UserCreateFormController,
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

    UserCreateFormController.$inject = ['API', '$state', 'Toast'];

    /* @ngInject */
    function UserCreateFormController(API, $state, Toast) {
        var
            vm    = this,
            Users = API.all('users');

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

            var stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.users' : vm.successStateRedirect;

            Users.post(vm.formData).then(function(response) {
                $state.go(stateRedirect);
                Toast.show('User added');
            }, function(error) {
                Toast.error('Error ' + error.data.status_code + ' : ' + error.data.message);

                // Log error message / object into console
                console.log(error);
                console.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            });
        }

    }

})();

