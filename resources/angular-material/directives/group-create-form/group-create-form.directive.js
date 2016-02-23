/**
 * group-create-form.directive.js
 * Created by anonymous on 31/12/15 12:59.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('groupCreateForm', groupCreateForm);

    groupCreateForm.$inject = [];

    /* @ngInject */
    function groupCreateForm() {

        var
            directive = {
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
            //
        }

    }

    GroupCreateFormController.$inject = ['API', '$state', 'Toast', 'logService'];

    /* @ngInject */
    function GroupCreateFormController(API, $state, Toast, logService) {

        var vm            = this;
        var
            Groups        = API.all('groups'),
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.groups' : vm.successStateRedirect;

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

            Groups.post(vm.formData).then(function(response) {

                // If update successfull and no error detected then redirect here
                $state.go(stateRedirect);

                // Show successfull toast notification
                Toast.show('Group added');

            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

