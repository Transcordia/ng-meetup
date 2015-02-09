'use strict';

/**
 * @ngdoc overview
 * @name ngRouterApp
 * @description
 * # ngRouterApp
 *
 * Main module of the application.
 */
angular
    .module( 'ngRouterApp', [ 'ngRoute' ] )
    .config( ['$routeProvider',
        function ( $routeProvider ) {
            $routeProvider
                .when( '/', {
                    templateUrl : 'views/main.html',
                    controllerAs: 'main',
                    controller : 'MainCtrl',
                    resolve : {
                        config : ['appService', function ( appService ) {
                            return appService.init();
                        }]
                    }
                } )
                .when( '/manage', {
                    templateUrl : 'views/manage.html',
                    controllerAs: 'manage',
                    controller : 'ManageCtrl',
                    resolve : {
                        groups : ['appService', function ( appService ) {
                            return appService.getGroups();
                        }]
                    }
                } )
                .when( '/manage/:id', {
                    templateUrl : 'views/manage-list.html',
                    controllerAs: 'manageList',
                    controller : 'ManageListCtrl',
                    resolve : {
                        group : ['appService', '$route', function ( appService, $route ) {
                            var params = $route.current.params;
                            var id = params.id;
                            var groups = appService.getGroups();
                            return groups.then( function ( data ) {
                                for (var i = 0, c = data.length; i < c; i++) {
                                    if (data[i].id === id) return data[i];
                                }
                                return null;
                            } );
                        }],
                        members : ['appService', '$route', function ( appService, $route ) {
                            var params = $route.current.params;
                            return appService.getMembers(params.id);
                        }]
                    }
                } )
                .otherwise( {
                    redirectTo : '/'
                } );
        }
    ] )
    .run(['$rootScope', function($root) {
        $root.$on('$routeChangeStart', function(e, curr, prev) {
            if (!prev && curr.$$route && curr.$$route.resolve) {
                $root.showSplash = true;
            }
        });
        $root.$on('$routeChangeSuccess', function(e, curr, prev) {
            $root.showSplash = false;
        });
    }]);
