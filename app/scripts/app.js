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
    .module( 'ngRouterApp', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.modal'] )
    .provider( 'modalState', function ( $stateProvider ) {
        var provider = this;
        this.$get = function () {
            return provider;
        };
        this.state = function ( stateName, options ) {
            $stateProvider.state( stateName, {
                url : options.url || '',
                onEnter : ['$stateParams', '$state', '$modal',
                    function ( $stateParams, $state, $modal ) {
                        $modal.open( {
                            templateUrl : options.templateUrl,
                            controller : options.controller,
                            constrollerAs: options.controllerAs
                        } ).result.finally( function () {
                                $state.go( '^', {}, {reload: true} );
                            } );
                    }
                ]
            } );
        };
    } )
    .config( ['$stateProvider', '$urlRouterProvider', 'modalStateProvider',
        function ( $stateProvider, $urlRouterProvider, modalStateProvider ) {
            $urlRouterProvider.when( '', '/' );
            $urlRouterProvider.otherwise( '/' );
            $stateProvider
                .state( 'app', {
                    url : '/',
                    views : {
                        '' : {
                            templateUrl : 'views/main.html'
                        }
                    },
                    controllerAs : 'main',
                    controller : 'MainCtrl',
                    resolve : {
                        config : ['appService', function ( appService ) {
                            console.log( 'Returning promise from app' );
                            return appService.init();
                        }]
                    }
                } )
                .state( 'app.manage', {
                    abstract : true,
                    views : {
                        'header@app.manage' : {
                            templateUrl : 'views/manage-header.html',
                            controllerAs : 'header',
                            controller : 'ManageHeaderCtrl'
                        },
                        '@' : {
                            templateUrl : 'views/manage.html'
                        }
                    },
                    resolve : {
                        groups : ['appService', function ( appService ) {
                            console.log( 'Returning promise from app.manage' );
                            return appService.getGroups();
                        }]
                    }
                } )
                .state( 'app.manage.groups', {
                    url : '^/manage',
                    views : {
                        'content' : {
                            templateUrl : 'views/manage-groups.html',
                            controllerAs : 'manageGroups',
                            controller : 'ManageGroupsCtrl'
                        }
                    }
                } )
                .state( 'app.manage.members', {
                    url : '^/manage/:id',
                    views : {
                        'content' : {
                            templateUrl : 'views/manage-members.html',
                            controllerAs : 'manageMembers',
                            controller : 'ManageMembersCtrl'
                        }
                    },
                    resolve : {
                        members : ['appService', '$stateParams', function ( appService, $stateParams ) {
                            return appService.getMembers( $stateParams.id );
                        }]
                    }
                } );
            modalStateProvider.state( 'app.manage.groups.add', {
                templateUrl : 'views/manage-groups-add.html',
                controllerAs : 'addGroup',
                controller : 'ManageGroupAddCtrl'
            } );
        }
    ] )
    .run( ['$state', '$rootScope', '$log', function ( $state, $rootScope, $log ) {
        $rootScope.$on( '$stateChangeStart',
            function ( event, toState, toParams, fromState, fromParams ) {
                if ( console.time && console.timeEnd ) {
                    console.time( 'State change -> ' + toState.name );
                }
                //$log.info( 'State change start:', fromState, '->', toState );
            } );

        $rootScope.$on( '$viewContentLoading',
            function ( event, viewConfig ) {
                if ( console.time && console.timeEnd ) {
                    console.time( 'view load' );
                }
                //$log.info( 'View content loading:', viewConfig );
            } );

        $rootScope.$on( '$stateNotFound',
            function ( event, unfoundState, fromState, fromParams ) {
                $log.info( 'Unfound state:', unfoundState );
                if ( console.time && console.timeEnd ) {
                    console.timeEnd( 'State change -> ' + toState.name );
                }
            } );

        $rootScope.$on( '$stateChangeError',
            function ( event, toState, toParams, fromState, fromParams, error ) {
                $log.info( 'State change error:', error );
                if ( console.time && console.timeEnd ) {
                    console.timeEnd( 'State change -> ' + toState.name );
                }
            } );

        $rootScope.$on( '$viewContentLoaded',
            function ( event ) {
                $log.info( 'View content loaded:', event );
                if ( console.time && console.timeEnd ) {
                    console.timeEnd( 'view load' );
                }
            } );

        $rootScope.$on( '$stateChangeSuccess',
            function ( event, toState, toParams, fromState, fromParams ) {
                $log.info( 'State change success:', fromState, '->', toState );
                if ( console.time && console.timeEnd ) {
                    console.timeEnd( 'State change -> ' + toState.name );
                }
            } );
    }] );
