/**
 * states.js
 * Created by anonymous on 01/12/15 23:48.
 */

(function() {
    'use strict';

    angular
        .module('seneschal')
        .config(seneschalRouter);

    seneschalRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider', '$provide', 'layoutProvider'];

    /* @ngInject */
    function seneschalRouter($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, layoutProvider) {
        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
        $httpProvider.interceptors.push('redirectWhenLoggedOut');
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('jwtauth', {
                abstract: true,
                url     : '/auth',
                views   : {
                    'layout@'        : {
                        templateUrl : layoutProvider.layout('minimalist.theme'),
                        controller  : 'JwtAuthController',
                        controllerAs: 'jwtAuth'
                    },
                    'header@jwtauth' : {
                        templateUrl : layoutProvider.layout('minimalist.header'),
                        controller  : 'HeaderController',
                        controllerAs: 'header'
                    },
                    'sidenav@jwtauth': {
                        templateUrl : layoutProvider.layout('minimalist.sidenav'),
                        controller  : 'SidenavController',
                        controllerAs: 'sidenav'
                    },
                    'aside@jwtauth'  : {
                        templateUrl : layoutProvider.layout('minimalist.aside'),
                        controller  : 'AsideController',
                        controllerAs: 'aside'
                    },
                    'footer@jwtauth' : {
                        templateUrl : layoutProvider.layout('minimalist.footer'),
                        controller  : 'FooterController',
                        controllerAs: 'footer'
                    },
                    'main@jwtauth'   : {}
                }
            })
            .state('jwtauth.signup', {
                url  : '/signup',
                data : {pageName: 'Sign-up'},
                views: {
                    'main@jwtauth': {
                        templateUrl : layoutProvider.view('jwt-auth.signup'),
                        controller  : 'JwtAuthSignupController',
                        controllerAs: 'signup'
                    }
                }
            })
            .state('jwtauth.signin', {
                url  : '/signin',
                data : {pageName: 'Sign-in'},
                views: {
                    'main@jwtauth': {
                        templateUrl : layoutProvider.view('jwt-auth.signin'),
                        controller  : 'JwtAuthSigninController',
                        controllerAs: 'signin'
                    }
                }
            })
            .state('jwtauth.forgot-password', {
                url  : '/forgot-password',
                data : {pageName: 'Forgot Password'},
                views: {
                    'main@jwtauth': {
                        templateUrl : layoutProvider.view('jwt-auth.forgot-password'),
                        controller  : 'JwtAuthForgotPasswordController',
                        controllerAs: 'forgot'
                    }
                }
            })
            .state('jwtauth.users-activate', {
                url  : '^/users/activate/{hash}/{code}',
                data : {pageName: 'Users Activate'},
                views: {
                    'main@jwtauth': {
                        templateUrl : layoutProvider.view('jwt-auth.users-activate'),
                        controller  : 'JwtAuthUsersActivateController',
                        controllerAs: 'activate'
                    }
                }
            })
            .state('jwtauth.reset-password', {
                url  : '^/reset/{hash}/{code}',
                data : {pageName: 'Reset Password'},
                views: {
                    'main@jwtauth': {
                        templateUrl : layoutProvider.view('jwt-auth.reset-password'),
                        controller  : 'JwtAuthResetPasswordController',
                        controllerAs: 'reset'
                    }
                }
            })
            .state('jwtauth.home', {
                url    : '/home',
                data   : {pageName: 'Home'},
                views  : {
                    'main@jwtauth': {
                        templateUrl : layoutProvider.view('jwt-auth.home'),
                        controller  : 'JwtAuthHomeController',
                        controllerAs: 'home'
                    }
                },
                resolve: {
                    loginRequired: loginRequired
                }
            });

        function redirectWhenLoggedOut($q, $injector) {

            var respError = {
                responseError: responseError
            };

            function responseError(rejection) {
                var
                    $state           = $injector.get('$state'),
                    rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                angular.forEach(rejectionReasons, function(value, key) {
                    if (rejection.data.error === value) {
                        localStorage.removeItem('user');
                        $state.go('jwtauth.signin');
                    }
                });

                return $q.reject(rejection);
            }

            return respError;
        }

        function skipIfLoggedIn($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }

        function loginRequired($q, $state, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $state.go('jwtauth.signin');
            }

            return deferred.promise;
        }

    }

})();

