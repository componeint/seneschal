/**
 * group-show-detail.directive.js
 * Created by anonymous on 16/01/16 14:54.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('groupShowDetail', groupShowDetail);

    groupShowDetail.$inject = [];

    /* @ngInject */
    function groupShowDetail() {
        var
            directive = {
                bindToController: true,
                controller      : GroupShowDetailController,
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

    GroupShowDetailController.$inject = ['API', 'logService'];

    /* @ngInject */
    function GroupShowDetailController(API, logService) {

        var vm     = this;
        var
            id     = _.isString(vm.id) ? parseInt(vm.id) : vm.id,
            Groups = API.all('groups');


        activate();

        ////////////////

        function activate() {

            Groups.get(id).then(function(response) {
                vm.lists = response;
            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

