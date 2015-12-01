/**
 * Created by anonymoussc on 01/12/15 23:48.
 */

(function() {
    'use strict';

    angular.module('components.routes.jwtAuth').config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('jwtauth', {
                abstract: true,
                url     : '/auth',
                views   : {
                    'layout@'       : {
                        templateUrl : layout('jwt_auth.simple'),
                        controller  : 'JwtAuthSimpleController',
                        controllerAs: 'jwtAuthSimple'
                    },
                    'header@jwtauth': {
                        templateUrl: view('jwt_auth.header')
                    },
                    'left@jwtauth'  : {
                        templateUrl: view('jwt_auth.left')
                    },
                    'right@jwtauth' : {
                        templateUrl: view('jwt_auth.right')
                    },
                    'footer@jwtauth': {
                        templateUrl: view('jwt_auth.footer')
                    },
                    'main@jwtauth'  : {}
                }
            })
            .state('jwtauth.signin', {
                url  : '/signin',
                data : { pageName: 'Sign-in' },
                views: {
                    'main@jwtauth': {
                        templateUrl: view('jwt_auth.home')
                    }
                }
            });

        function view(viewName) {
            if (viewName !== "") {
                return './views/applications/' + appName(viewName) + '/' + fileDir(viewName) + '/' + fileName(viewName) + '.html';
            } else {
                return './views/applications/app/home/home.html';
            }
        }

        function layout(viewName) {
            if (viewName !== "") {
                return './views/layouts/' + appName(viewName) + '/' + fileDir(viewName) + '/' + fileName(viewName) + '.html';
            } else {
                return './views/applications/app/home/home.html';
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
    });
})();
