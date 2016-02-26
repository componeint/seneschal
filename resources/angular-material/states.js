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
            .state('dashboard.groups', {
                url  : '/groups',
                data : {pageName: 'Groups'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('groups.index'),
                        controller  : 'GroupsIndexController',
                        controllerAs: 'index'
                    }
                }
            })
            .state('dashboard.groups.create', {
                url  : '/create',
                data : {pageName: 'Create'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('groups.create'),
                        controller  : 'GroupsCreateController',
                        controllerAs: 'create'
                    }
                }
            })
            .state('dashboard.groups.show', {
                url  : '/show/{id}',
                data : {pageName: 'Show'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('groups.show'),
                        controller  : 'GroupsShowController',
                        controllerAs: 'show'
                    }
                }
            })
            .state('dashboard.groups.edit', {
                url  : '/edit/{id}',
                data : {pageName: 'Edit'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('groups.edit'),
                        controller  : 'GroupsEditController',
                        controllerAs: 'edit'
                    }
                }
            })
            .state('dashboard.users', {
                url  : '/users',
                data : {pageName: 'Users'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('users.index'),
                        controller  : 'UsersIndexController',
                        controllerAs: 'index'
                    }
                }
            })
            .state('dashboard.users.create', {
                url  : '/create',
                data : {pageName: 'Create'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('users.create'),
                        controller  : 'UsersCreateController',
                        controllerAs: 'create'
                    }
                }
            })
            .state('dashboard.users.show', {
                url  : '/show/{id}',
                data : {pageName: 'Show'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('users.show'),
                        controller  : 'UsersShowController',
                        controllerAs: 'show'
                    }
                }
            })
            .state('dashboard.users.edit', {
                url  : '/edit/{id}',
                data : {pageName: 'Edit'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('users.edit'),
                        controller  : 'UsersEditController',
                        controllerAs: 'edit'
                    }
                }
            })
            .state('dashboard.users.edit-membership', {
                url  : '/edit-membership/{id}',
                data : {pageName: 'Edit Membership'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('users.edit-membership'),
                        controller  : 'UsersEditMembershipController',
                        controllerAs: 'edit'
                    }
                }
            })
            .state('dashboard.users.edit-password', {
                url  : '/edit-password/{id}',
                data : {pageName: 'Edit Password'},
                views: {
                    'main@dashboard': {
                        templateUrl : layoutProvider.dashboard('users.edit-password'),
                        controller  : 'UsersEditPasswordController',
                        controllerAs: 'edit'
                    }
                }
            })
            .state('jwtauth', {
                abstract: true,
                url     : '/auth',
                views   : {
                    'layout@'        : {
                        templateUrl : layoutProvider.layout('themes.minimalist'),
                        controller  : 'JwtAuthController',
                        controllerAs: 'jwtAuth'
                    },
                    'header@jwtauth' : {
                        templateUrl : layoutProvider.view('jwt-auth.header'),
                        controller  : 'JwtAuthHeaderController',
                        controllerAs: 'header'
                    },
                    'sidenav@jwtauth': {
                        templateUrl : layoutProvider.view('jwt-auth.sidenav'),
                        controller  : 'JwtAuthSidenavController',
                        controllerAs: 'sidenav'
                    },
                    'aside@jwtauth'  : {
                        templateUrl : layoutProvider.view('jwt-auth.aside'),
                        controller  : 'JwtAuthAsideController',
                        controllerAs: 'aside'
                    },
                    'footer@jwtauth' : {
                        templateUrl : layoutProvider.view('jwt-auth.footer'),
                        controller  : 'JwtAuthFooterController',
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
            })
            .state('profile', {
                abstract: true,
                url     : '/auth',
                views   : {
                    'layout@'        : {
                        templateUrl : layoutProvider.layout('themes.minimalist'),
                        controller  : 'ProfileController',
                        controllerAs: 'profile'
                    },
                    'header@profile' : {
                        templateUrl : layoutProvider.view('profile.header'),
                        controller  : 'ProfileHeaderController',
                        controllerAs: 'header'
                    },
                    'sidenav@profile': {
                        templateUrl : layoutProvider.view('profile.sidenav'),
                        controller  : 'ProfileSidenavController',
                        controllerAs: 'sidenav'
                    },
                    'aside@profile'  : {
                        templateUrl : layoutProvider.view('profile.aside'),
                        controller  : 'ProfileAsideController',
                        controllerAs: 'aside'
                    },
                    'footer@profile' : {
                        templateUrl : layoutProvider.view('profile.footer'),
                        controller  : 'ProfileFooterController',
                        controllerAs: 'footer'
                    },
                    'main@profile'   : {}
                }
            })
            .state('profile.username', {
                url    : 'profile/{username}',
                data   : {pageName: 'Profile'},
                views  : {
                    'main@profile': {
                        templateUrl : layoutProvider.view('profile.username'),
                        controller  : 'profileUsernameController',
                        controllerAs: 'profile'
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

