'use strict';

/**
 * @ngdoc service
 * @name ngRouterApp.server
 * @description
 * # server
 * Service in the ngRouterApp.
 */
angular.module( 'ngRouterApp' )
    .service( 'appService', ['$timeout', '$q', function ( $timeout, $q ) {
        var initPromise, getGroupsPromise;

        function defer( payload, delay ) {
            if ( isNaN( delay ) ) delay = 0;
            var deferred = $q.defer();
            $timeout( function () {
                console.log( 'Promise resolved', payload );
                deferred.resolve( payload );
            }, delay );
            return deferred.promise;
        }

        return {
            // Simulate a slow initialization time
            init : function () {
                if ( initPromise == null ) {
                    initPromise = defer( {
                        auth : true,
                        name : 'Fred Flintstone'
                    }, 3000 );
                }
                return initPromise;
            },

            getGroups : function () {
                if ( getGroupsPromise == null ) {
                    getGroupsPromise = defer( [
                            {id : '34D', name : 'AM Classroom'},
                            {id : 'A5C', name : 'PM Classroom'},
                            {id : 'K3P', name : 'After School Care'}
                        ]
                    );
                }
                return getGroupsPromise;
            },

            getMembers : function () {
                return defer( [
                        {id : '101', name : 'Amy Adams'},
                        {id : '102', name : 'Bill Bixby'},
                        {id : '103', name : 'Chevy Chase'},
                        {id : '103', name : 'Danny Devito'},
                        {id : '103', name : 'Emilio Estevez'},
                        {id : '103', name : 'Farah Fawcett'},
                        {id : '103', name : 'Gordon Gecko'},
                        {id : '103', name : 'Helen Hunt'}
                    ]
                );
            }
        }
    }] );
