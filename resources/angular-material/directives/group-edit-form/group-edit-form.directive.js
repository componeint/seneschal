/**
 * group-edit-form.directive.js
 * Created by anonymous on 23/01/16 8:08.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('groupEditForm', groupEditForm);

    groupEditForm.$inject = [];

    /* @ngInject */
    function groupEditForm() {

        var
            directive = {
                bindToController: true,
                controller      : GroupEditFormController,
                controllerAs    : 'ctrl',
                link            : link,
                restrict        : 'EA',
                scope           : {
                    id                  : '=id',
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

    GroupEditFormController.$inject = ['API', '$state', 'Toast', 'logService'];

    /* @ngInject */
    function GroupEditFormController(API, $state, Toast, logService) {

        var vm            = this;
        var
            id            = _.isString(vm.id) ? parseInt(vm.id) : vm.id,
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.groups' : vm.successStateRedirect;

        vm.update = update;


        activate();

        ////////////////

        function activate() {

            API.one('groups', id).getList('edit').then(function(response) {
                vm.listWithId = response;
            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

        function update(id) {

            API.one('groups').doPUT(vm.listWithId[0].group, id).then(function(response) {

                // If update successfull and no error detected then redirect here
                $state.go(stateRedirect);

                // Show successfull toast notification
                Toast.show('Group updated');

            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

