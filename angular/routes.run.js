/**
 * Created by anonymoussc on 04/12/15 9:11.
 */

(function() {
    'use strict';

    angular.module('components.routes.jwtAuth').run(function($rootScope) {
        $rootScope.$on("$stateChangeStart", function(event, toState) {
            var user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                $rootScope.authenticated = true;
                $rootScope.currentUser   = user;

                if ((toState.name === 'jwtauth.signin') || (toState.name === 'jwtauth.register')) {
                    event.preventDefault();
                    $state.go('app.home');
                }
            }
        });
    });
})();

