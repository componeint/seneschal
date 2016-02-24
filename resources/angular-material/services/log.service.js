/**
 * log.service.js
 * Created by anonymous on 19/02/16 16:53.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .factory('logService', logService);

    logService.$inject = ['Toast', '$log'];

    /* @ngInject */
    function logService(Toast, $log) {

        var
            service = {
                log  : log,
                info : info,
                warn : warn,
                error: error,
                debug: debug
            };

        return service;

        ////////////////

        function log() {
            //
        }

        function info() {
            //
        }

        function warn() {
            //
        }

        function error(error) {

            Toast.error('Error ' + error.data.status_code + ' : ' + error.data.message);

            // Log error message / object into console
            $log.log(error);
            $log.log('Error ' + error.data.status_code + ' : ' + error.data.message);
            $log.log('Message ' + ' : ' + error.data.message);
            $log.log('Code ' + ' : ' + error.data.code);
            $log.log('Status code ' + ' : ' + error.data.status_code);

        }

        function debug(error) {

            // Log error message / object into console
            if (_.isUndefined(error.data.debug) === false) {
                $log.debug('Debug ' + error.data.debug.line + ' : ' + error.data.debug.file + ' , ' + error.data.debug.class);
                $log.debug('Debug::line' + ' : ' + error.data.debug.line);
                $log.debug('Debug::file' + ' : ' + error.data.debug.file);
                $log.debug('Debug::class' + ' : ' + error.data.debug.class);
                $log.debug('Debug::trace ' + ' : ');

                for (var i = 0; i <= error.data.debug.trace.length; i++) {
                    $log.debug(error.data.debug.trace[i]);
                }
            }
        }

    }

})();

