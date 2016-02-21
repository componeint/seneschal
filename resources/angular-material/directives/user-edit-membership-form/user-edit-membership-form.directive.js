/**
 * user-edit-membership-form.directive.js
 * Created by anonymous on 21/02/16 23:24.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('userEditMembershipForm', userEditMembershipForm);

    userEditMembershipForm.$inject = [];

    /* @ngInject */
    function userEditMembershipForm() {

        var
            directive = {
                bindToController: true,
                controller      : UserEditMembershipFormController,
                controllerAs    : '$ctrl',
                link            : link,
                restrict        : 'EA',
                scope           : {
                    id: '=id'
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

    UserEditMembershipFormController.$inject = [];

    /* @ngInject */
    function UserEditMembershipFormController() {

        var vm            = this;
        var
            id            = _.isString(vm.id) ? parseInt(vm.id) : vm.id,
            stateRedirect = _.isEmpty(vm.successStateRedirect) ? 'dashboard.users' : vm.successStateRedirect;
    }

})();

