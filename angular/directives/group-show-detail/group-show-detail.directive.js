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
                id: '@'
            },
            templateUrl     : function(elem, attr) {
                return attr.template;
            }
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    GroupShowDetailController.$inject = [];

    /* @ngInject */
    function GroupShowDetailController() {

    }

})();

