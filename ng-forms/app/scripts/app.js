'use strict';

/**
 * ngFormsApp
 *
 * Main module of the application.
 */
angular
    .module('ngFormsApp', [
        'ui.router',
        'ui.bootstrap.showErrors',
        'ngFormsApp.directives.factorValidator',
        'ngFormsApp.directives.ctlBoundDirective'
    ])
    .config(function ($stateProvider) {

        $stateProvider
            .state('app', {
                url: '/home',

                views: {
                    'content': {
                        templateUrl: 'views/home.html',
                        controller: 'HomeCtl'
                    }
                }
            }).

            state('app.formExample1', {
                url: '/example1',
                views: {
                    'content@': {
                        templateUrl: 'views/form-example1.html'
                    }
                }
            }).

            state('app.ctlBoundDirective', {
                url: '/ctlBoundDirective',
                views: {
                    'content@': {
                        templateUrl: 'views/controller-bound-directive.html'
                    }
                }
            }).

            state('app.ngoptions', {
                url: '/ngoptions',
                views: {
                    'content@': {
                        templateUrl: 'views/ngoptions.html',
                        controller: 'OptionsCtl'
                    }
                }
            }).

            state('app.formExample2', {
                url: '/example2',
                views: {
                    'content@': {
                        templateUrl: 'views/form-example2.html',
                        controller: 'Form1Ctl'
                    }
                }
            });

    })


    .run(function ($state, $rootScope) {
        $state.go('app');

        $rootScope.$on('$stateNotFound',
            function (event, unfoundState, fromState, fromParams) {
                console.error(unfoundState.to); // "lazy.state"
                console.error(unfoundState.toParams); // {a:1, b:2}
                console.error(unfoundState.options); // {inherit:false} + default options
            });

        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                console.error("StateChangeError: " + error);
            });

    });
