/**
 * Created by anonymous on 01/12/15 23:48.
 */

(function() {
    'use strict';

    angular
        .module('jwtAuth')
        .config(jwtAuthRouter);

    jwtAuthRouter.$inject = ['$stateProvider', '$urlRouterProvider','$authProvider', '$httpProvider', '$provide'];

    /* @ngInject */
    function jwtAuthRouter($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide) {
        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
        $httpProvider.interceptors.push('redirectWhenLoggedOut');
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('dashboard.users', {
                url  : '/users',
                data : {pageName: 'Users'},
                views: {
                    'main@dashboard': {
                        templateUrl : dashboard('users.index'),
                        controller  : 'UserIndexController',
                        controllerAs: 'index'
                    }
                }
            })
            .state('dashboard.users.create', {
                url  : '/users',
                data : {pageName: 'Create'},
                views: {
                    'main@dashboard': {
                        templateUrl : dashboard('users.create'),
                        controller  : 'UserCreateController',
                        controllerAs: 'create'
                    }
                }
            })
            .state('dashboard.users.show', {
                url  : '/show',
                data : {pageName: 'Show'},
                views: {
                    'main@dashboard': {
                        templateUrl : dashboard('users.show'),
                        controller  : 'UserShowController',
                        controllerAs: 'show'
                    }
                }
            })
            .state('dashboard.users.edit', {
                url  : '/edit',
                data : {pageName: 'Edit'},
                views: {
                    'main@dashboard': {
                        templateUrl : dashboard('users.edit'),
                        controller  : 'UserEditController',
                        controllerAs: 'edit'
                    }
                }
            })
            .state('jwtauth', {
                abstract: true,
                url     : '/auth',
                views   : {
                    'layout@'       : {
                        templateUrl : layout('jwt-auth.simple'),
                        controller  : 'JwtAuthController',
                        controllerAs: 'jwtAuth'
                    },
                    'header@jwtauth': {
                        templateUrl : view('jwt-auth.header'),
                        controller  : 'JwtAuthHeaderController',
                        controllerAs: 'header'
                    },
                    'left@jwtauth'  : {
                        templateUrl : view('jwt-auth.left'),
                        controller  : 'JwtAuthLeftController',
                        controllerAs: 'left'
                    },
                    'right@jwtauth' : {
                        templateUrl : view('jwt-auth.right'),
                        controller  : 'JwtAuthRightController',
                        controllerAs: 'right'
                    },
                    'footer@jwtauth': {
                        templateUrl : view('jwt-auth.footer'),
                        controller  : 'JwtAuthFooterController',
                        controllerAs: 'footer'
                    },
                    'main@jwtauth'  : {}
                }
            })
            .state('jwtauth.signup', {
                url  : '/signup',
                data : {pageName: 'Sign-up'},
                views: {
                    'main@jwtauth': {
                        templateUrl : view('jwt-auth.signup'),
                        controller  : 'JwtAuthSignupController',
                        controllerAs: 'signup'
                    }
                }
            })
            .state('jwtauth.signin', {
                url  : '/signin',
                data : {pageName: 'Sign in'},
                views: {
                    'main@jwtauth': {
                        templateUrl : view('jwt-auth.signin'),
                        controller  : 'JwtAuthSigninController',
                        controllerAs: 'signin'
                    }
                }
            })
            .state('jwtauth.home', {
                url  : '/home',
                data : {pageName: 'Home'},
                views: {
                    'main@jwtauth': {
                        templateUrl : view('jwt-auth.home'),
                        controller  : 'JwtAuthHomeController',
                        controllerAs: 'home'
                    }
                },
                resolve    : {
                    loginRequired: loginRequired
                }
            });

        function dashboard(viewName) {
            if (viewName !== '') {
                return './views/dashboard/' + appName(viewName) + '/' + fileDir(viewName) + '/' + fileName(viewName) + '.html';
            } else {
                return './views/app/app/home/home.html';
            }
        }

        function view(viewName) {
            if (viewName !== '') {
                return './views/app/' + appName(viewName) + '/' + fileDir(viewName) + '/' + fileName(viewName) + '.html';
            } else {
                return './views/app/app/home/home.html';
            }
        }

        function layout(viewName) {
            if (viewName !== '') {
                return './views/layouts/' + appName(viewName) + '/' + fileDir(viewName) + '/' + fileName(viewName) + '.html';
            } else {
                return './views/app/app/home/home.html';
            }
        }

        function appName(v) {
            if (v.split('.')[0]) {
                return v.split('.')[0];
            } else {
                return 'app';
            }
        }

        function fileDir(v) {
            if (v.split('.')[1]) {
                return v.split('.')[1];
            } else if (!v.split('.')[0]) {
                return v;
            } else {
                return 'home';
            }
        }

        function fileName(v) {
            if (v.split('.')[2]) {
                return v.split('.')[2];
            } else if (!v.split('.')[2]) {
                if (v.split('.')[1]) {
                    return v.split('.')[1];
                }
            } else {
                return 'home';
            }
        }

        function redirectWhenLoggedOut($q, $injector) {

            return {

                responseError: function(rejection) {
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
            };
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

        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/auth/signin');
            }
            return deferred.promise;
        }

    }

})();

