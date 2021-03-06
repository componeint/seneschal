/**
 * states.run.js
 * Created by @anonymoussc on 04/12/15 9:11.
 */

(function() {
    'use strict';

    angular.module('seneschal').run(function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {

            var user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                $rootScope.authenticated = true;
                $rootScope.currentUser   = user;

                if (user.activated === 0) {
                    event.preventDefault();
                    $state.go('jwtauth.users-reactivate');
                }
            }

        });

    });

})();

