/**
 * user-show-detail.scss
 * Created by anonymous on 22/01/16 14:14.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('userShowDetail', userShowDetail);

    userShowDetail.$inject = [];

    /* @ngInject */
    function userShowDetail() {
        var directive = {
            bindToController: true,
            controller      : UserShowDetailController,
            controllerAs    : 'ctrl',
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

        }
    }

    UserShowDetailController.$inject = ['Users'];

    /* @ngInject */
    function UserShowDetailController(Users) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            var id;
            if (_.isString(vm.id)) {
                id = parseInt(vm.id);
            } else {
                id = vm.id;
            }

            Users.get(id).then(function(response) {
                vm.lists = response;
            }, function(error) {
                ToastService.error('Error ' + error.data.status_code + ' : ' + error.data.message);

                // Log error message / object into console
                console.log(error);
                console.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            });
        }
    }

})();

