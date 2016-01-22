/**
 * group-show-detail.directive.js
 * Created by anonymous on 16/01/16 14:54.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .directive('groupShowDetail', groupShowDetail);

    groupShowDetail.$inject = [];

    /* @ngInject */
    function groupShowDetail() {
        var directive = {
            bindToController: true,
            controller      : GroupShowDetailController,
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

    GroupShowDetailController.$inject = ['Groups'];

    /* @ngInject */
    function GroupShowDetailController(Groups) {
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

            Groups.get(id).then(function(response) {
                vm.records = response.data;
            });
        }

    }

})();

