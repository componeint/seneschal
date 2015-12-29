/**
 * Created by anonymous on 29/12/15 21:56.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('groupsService', groupsService);

    groupsService.$inject = [];

    /* @ngInject */
    function groupsService() {
        var service = {
            group     : group(),
            flComplete: flComplete()
        };

        return service;

        ////////////////

        function group() {
            var usr = {
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
                                field: 'name',
                                title: 'Name'
                            },
                            {
                                field: 'permissions',
                                title: 'Permissions'
                            }
                        ],
                        filters     : [
                            {
                                field    : 'name',
                                title    : 'Name',
                                condition: 'like_b',
                                options  : {
                                    insensitive: true
                                }
                            },
                            {
                                field    : 'permissions',
                                title    : 'Permissions',
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
                        listURL           : '/api/groups',
                        method            : 'GET',
                        urlencoded        : true,
                        pagesize          : 5,
                        orderby           : [
                            {field: 'name', type: 'asc'}
                        ],
                        sortOnClient      : true,
                        paginationOnClient: true,
                        searchOnClient    : true
                        // Enable log
                        //, log             : {id: 'groupsService', err: true, debug: true}
                    }
                }
            };

            return usr;
        }

        function flComplete($e, $args) {
            angular.forEach(group().fl.records, function(record) {
                if (record.id === 'dell-venue') {
                    record.readonly = true;
                    return;
                }
            });
        }

        function addRecord() {
            alert('add record');
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
            if (attrs['field'] == 'name') {
                if (attrs['value'] == 'Dell Venue') {
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

