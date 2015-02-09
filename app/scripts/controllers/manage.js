'use strict';

/**
 * @ngdoc function
 * @name ngRouterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngRouterApp
 */
angular.module( 'ngRouterApp' )
    .controller( 'ManageCtrl', ['$scope', 'groups',
        function ( $scope, groups ) {
            this.groups = groups;
        }
    ] );
