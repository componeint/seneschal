/**
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
            controllerAs    : 'vm',
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

    GroupCreateFormController.$inject = ['API', 'ToastService'];

    /* @ngInject */
    function GroupCreateFormController(API, ToastService) {
        var vm                = this;
        vm.defaultPermissions = [
            {name: 'admin', value: 1},
            {name: 'users', value: 1}
        ];
        vm.selected           = [];
        vm.toggle             = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
                //Object.assign({}, list.push(item));
            }
        };
        vm.exists             = function(item, list) {
            return list.indexOf(item) > -1;
        };
        vm.groupCreate        = groupCreate;

        activate();

        ////////////////

        function activate() {
            //
        }

        function groupCreate() {
            vm.formData = {
                name       : vm.name,
                permissions: vm.selected
            };

            /*
            API.all('posts').post(vm.formData).then(function(response){
             ToastService.show('Post added successfully');
             });
             */

            console.log(vm.formData);
        }

    }

})();

