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
            //
        }

    }

    UserCreateFormController.$inject = ['API', '$state', 'Toast', 'logService'];

    /* @ngInject */
    function UserCreateFormController(API, $state, Toast, logService) {

        var vm            = this;
        var
            Users         = API.all('users'),
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.users' : vm.successStateRedirect;

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

                // If update successfull and no error detected then redirect here
                $state.go(stateRedirect);

                // Show successfull toast notification
                Toast.show('User added');

            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

