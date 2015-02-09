'use strict';

/**
 * @ngdoc function
 * @name ngRouterApp.controller:ManageMembersCtrl
 * @description
 * # ManageMembersCtrl
 * Controller of the ngRouterApp
 */
angular.module( 'ngRouterApp' )
    .controller( 'ManageMembersCtrl', ['$scope', '$stateParams', 'groups', 'members',
        function ( $scope, params, groups, members ) {
            var id = params.id;
            this.groupName = 'Unknown';
            for ( var i = 0, c = groups.length; i < c; i++ )
                if ( groups[i].id === id ) {
                    this.groupName = groups[i].name;
                    break;
                }
            this.members = members;
        }
    ] );
