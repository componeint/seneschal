/**
 * Created by anonymous on 01/12/15 23:48.
 */

(function() {
    'use strict';

    angular.module('jwtAuth').config(function($stateProvider, $urlRouterProvider, $httpProvider, $provide) {
        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
        $httpProvider.interceptors.push('redirectWhenLoggedOut');
        $urlRouterProvider.otherwise('/');

        $stateProvider
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
                        controllerAs: 'jwtAuthLeft'
                    },
                    'right@jwtauth' : {
                        templateUrl : view('jwt-auth.right'),
                        controller  : 'JwtAuthRightController',
                        controllerAs: 'jwtAuthRight'
                    },
                    'footer@jwtauth': {
                        templateUrl : view('jwt-auth.footer'),
                        controller  : 'JwtAuthFooterController',
                        controllerAs: 'footer'
                    },
                    'main@jwtauth'  : {}
                }
            })
            .state('jwtauth.signin', {
                url  : '/sign-in',
                data : { pageName: 'Sign-in' },
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
                data : { pageName: 'Home' },
                views: {
                    'main@jwtauth': {
                        templateUrl : view('jwt-auth.home'),
                        controller  : 'JwtAuthHomeController',
                        controllerAs: 'jwtAuthHome'
                    }
                }
            });

        function view(viewName) {
            if (viewName !== "") {
                return './views/app/' + appName(viewName) + '/' + fileDir(viewName) + '/' + fileName(viewName) + '.html';
            } else {
                return './views/app/app/home/home.html';
            }
        }

        function layout(viewName) {
            if (viewName !== "") {
                return './views/layouts/' + appName(viewName) + '/' + fileDir(viewName) + '/' + fileName(viewName) + '.html';
            } else {
                return './views/app/app/home/home.html';
            }

        }

        function appName(v) {
            if (v.split(".")[0]) {
                return v.split(".")[0];
            } else {
                return 'app';
            }
        }

        function fileDir(v) {
            if (v.split(".")[1]) {
                return v.split(".")[1];
            } else if (!v.split(".")[0]) {
                return v;
            } else {
                return 'home';
            }
        }

        function fileName(v) {
            if (v.split(".")[2]) {
                return v.split(".")[2];
            } else if (!v.split(".")[2]) {
                if (v.split(".")[1]) {
                    return v.split(".")[1];
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
    });
})();
