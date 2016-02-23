/**
 * user-show-detail.directive.js
 * Created by anonymous on 22/01/16 14:14.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .directive('userShowDetail', userShowDetail);

    userShowDetail.$inject = [];

    /* @ngInject */
    function userShowDetail() {

        var
            directive = {
                bindToController: true,
                controller      : UserShowDetailController,
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

    UserShowDetailController.$inject = ['API', 'logService'];

    /* @ngInject */
    function UserShowDetailController(API, logService) {

        var vm    = this;
        var
            id    = _.isString(vm.id) ? parseInt(vm.id) : vm.id,
            Users = API.all('users');


        activate();

        ////////////////

        function activate() {

            Users.get(id).then(function(response) {
                vm.lists = response;
            }, function(error) {

                logService.error(error);
                logService.debug(error);

            });

        }

    }

})();

