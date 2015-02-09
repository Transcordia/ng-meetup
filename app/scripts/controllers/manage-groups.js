'use strict';

/**
 * @ngdoc function
 * @name ngRouterApp.controller:ManageCtrl
 * @description
 * # ManageCtrl
 * Controller of the ngRouterApp
 */
angular.module( 'ngRouterApp' )
    .controller( 'ManageGroupsCtrl', ['groups',
        function ( groups ) {
            this.groups = groups;
        }
    ] );
