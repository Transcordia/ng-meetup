'use strict';

/**
 * @ngdoc function
 * @name ngRouterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngRouterApp
 */
angular.module( 'ngRouterApp' )
    .controller( 'MainCtrl', ['$scope', 'config', function ( $scope, config ) {
        this.fullname = config.name;
    } ] );
