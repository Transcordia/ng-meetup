'use strict';

/**
 * @ngdoc function
 * @name ngRouterApp.controller:ManageCtrl
 * @description
 * # ManageCtrl
 * Controller of the ngRouterApp
 */
angular.module( 'ngRouterApp' )
    .controller( 'ManageHeaderCtrl', ['$scope', '$state', 'groups',
        function ( $scope, $state, groups ) {
            var ctrl = this;

            function getGroupById(id) {
                for ( var i = 0, c = groups.length; i < c; i++ ) {
                    if (groups[i].id === id) return groups[i].name;
                }
                return 'Unknown';
            }

            $scope.$on( '$stateChangeSuccess',
                function ( event, toState, toParams, fromState, fromParams ) {
                    switch (toState.name) {
                        case 'app.manage.members':
                            var id = $state.params.id;
                            ctrl.title = getGroupById( id );
                            ctrl.priorState = function() {
                                $state.go( 'app.manage.groups' );
                            };
                            break;
                        case 'app.manage.groups':
                            ctrl.title = 'My Groups';
                            ctrl.priorState = function() {
                                $state.go( 'app' );
                            };
                            break;
                    }
                } );
        }
    ] );
