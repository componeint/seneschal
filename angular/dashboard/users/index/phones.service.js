/**
 * Created by anonymous on 28/12/15 14:35.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .factory('phonesService', phonesService);

    phonesService.$inject = [];

    /* @ngInject */
    function phonesService() {
        var service = {
            phone     : phone(),
            flComplete: flComplete()
        };

        return service;

        ////////////////

        function phone() {
            var ph = {
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
                            {field: 'age', title: 'ID'},
                            {field: 'name', title: 'Name'},
                            {field: 'snippet', title: 'Description', sortable: false}
                        ],
                        filters     : [
                            {field: 'age', title: 'ID', condition: 'eq'},
                            {field: 'name', title: 'Name', condition: 'like_b', options: {insensitive: true}},
                            {
                                field    : 'snippet',
                                title    : 'Description',
                                condition: 'like_b',
                                options  : {insensitive: true}
                            }
                        ],
                        pagesizes   : [5, 10, 20],
                        debug       : true,
                        displayField: displayField
                    }
                },

                fl: {
                    options: {
                        listURL           : 'desserts.json',
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
                        ,log: {id: 'phonesService', err: true, debug: true}
                    }
                }
            };

            return ph;
        }

        function flComplete($e, $args) {
            angular.forEach(phone().fl.records, function(record) {
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

