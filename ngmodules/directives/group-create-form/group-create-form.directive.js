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

        }
    }

    GroupCreateFormController.$inject = ['API', '$state', 'Toast'];

    /* @ngInject */
    function GroupCreateFormController(API, $state, Toast) {

        var vm     = this,
            Groups = API.all('groups');

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
                Toast.show('Group added');
            }, function(error) {
                Toast.error('Error ' + error.data.status_code + ' : ' + error.data.message);

                // Log error message / object into console
                console.log(error);
                console.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            });

        }

    }

})();

