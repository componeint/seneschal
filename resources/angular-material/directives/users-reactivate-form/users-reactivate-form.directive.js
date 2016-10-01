/**
 * users-reactivate-form.directive
 * Created by @anonymoussc on 03/03/16 23:39.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('usersReactivateForm', usersReactivateForm);

    usersReactivateForm.$inject = [];

    /* @ngInject */
    function usersReactivateForm() {

        var
            directive = {
                bindToController: true,
                controller      : UsersReactivateFormController,
                controllerAs    : '$ctrl',
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

    UsersReactivateFormController.$inject = ['API', '$state', 'logService', '$timeout', 'Toast'];

    /* @ngInject */
    function UsersReactivateFormController(API, $state, logService, $timeout, Toast) {

        // noinspection JSUnusedAssignment
        var vm            = this;
        var stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'client.home' : vm.successStateRedirect;

        vm.reactivate     = reactivate;

        /* @Init */
        activate();

        ////////////////

        function activate() {
            //
        }

        function reactivate() {

            vm.formData = {
                email: vm.email
            };

            API.one('reactivate').doPOST(vm.formData).then(function(response) {

                if (!response.status.error) {
                    Toast.show('Email sent');

                    /*
                     $timeout(function() {
                     $state.go(stateRedirect);
                     }, 7000);
                     */
                }
            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

