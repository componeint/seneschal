/**
 * Created by anonymous on 28/12/15 22:14.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('usersService', usersService);

    usersService.$inject = ['$state'];

    /* @ngInject */
    function usersService($state) {
        var service = {
            lists: lists()
        };

        return service;

        ////////////////

        function lists() {
            var obj = {
                ct: {
                    options: {
                        pk          : 'id',
                        refreshBtn  : true,
                        addRecord   : addRecord,
                        actionsCol  : true,
                        editRecord  : editRecord,
                        deleteRecord: deleteRecord,
                        deleteRows  : deleteRows,
                        cols        : [
                            {
                                field: 'email',
                                title: 'User'
                            },
                            {
                                field: 'status',
                                title: 'Status'
                            }
                        ],
                        filters     : [
                            {
                                field    : 'email',
                                title    : 'User',
                                condition: 'like_b',
                                options  : {
                                    insensitive: true
                                }
                            },
                            {
                                field    : 'status',
                                title    : 'Status',
                                condition: 'like_b',
                                options  : {
                                    insensitive: true
                                }
                            }
                        ],
                        pagesizes   : [5, 10, 20],
                        debug       : true,
                        displayField: displayField
                    }
                },
                fl: {
                    options: {
                        listURL           : '/api/users',
                        method            : 'GET',
                        urlencoded        : true,
                        pagesize          : 5,
                        orderby           : [
                            {
                                field: 'name',
                                type : 'asc'
                            }
                        ],
                        sortOnClient      : true,
                        paginationOnClient: true,
                        searchOnClient    : true
                        // Enable log
                        //, log             : {id: 'usersService', err: true, debug: true}
                    }
                }
            };

            return obj;
        }

        function addRecord() {
            $state.go('dashboard.users.create');
        }

        function editRecord(record) {
            alert('edit record');
        }

        function deleteRecord(record) {
            alert('delete record');
        }

        function deleteRows(selection) {
            alert(selection.length + ' records selected');
        }

        function displayField(scope, element, attrs) {
            // Add a link on field "name" to each record
            if (attrs['field'] == 'email') {
                if (attrs['value'] === null) {
                    element.html('<a onclick="event.stopPropagation();alert(\'This is a read-only record\');" href="javascript:void(0);">' + attrs['value'] + '</a>');
                }
                else {
                    element.html('<a onclick="event.stopPropagation();alert(\'interested on this phone?\');" href="javascript:void(0);">' + attrs['value'] + '</a>');
                }

                return;
            }

            element.html(attrs['value']);
        }
    }

})();

