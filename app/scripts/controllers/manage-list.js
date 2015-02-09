'use strict';

/**
 * @ngdoc function
 * @name ngRouterApp.controller:ManageCtrl
 * @description
 * # ManageCtrl
 * Controller of the ngRouterApp
 */
angular.module( 'ngRouterApp' )
    .controller( 'ManageListCtrl', ['$scope', 'group', 'members',
        function ( $scope, group, members ) {
            this.groupName = group && group.name || 'Unknown';
            this.members = members;
        }
    ] );
