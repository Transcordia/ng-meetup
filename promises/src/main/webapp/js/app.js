'use strict';

var app = angular.module( 'promisesDemo', [ 'location', 'weather', 'ngRoute', 'ngTouch', 'slidePushMenu' ] )
    .config( function ( $routeProvider ) {
        $routeProvider
            .when( '/', {
                templateUrl : 'views/main.html'
            } )
            .when( '/delay', {
                templateUrl : 'views/delay.html'
            } )
            .when( '/countdown', {
                templateUrl : 'views/countdown.html'
            } )
            .when( '/simple_callback', {
                templateUrl : 'views/simple_callback.html'
            } )
            .when( '/complex_callback', {
                templateUrl : 'views/complex_callback.html'
            } )
            .when( '/services_blocking', {
                templateUrl : 'views/services_blocking.html'
            } )
            .when( '/services_http', {
                templateUrl : 'views/services_http.html'
            } )
            .when( '/services_promises', {
                templateUrl : 'views/services_promises.html'
            } )
            .when( '/unnested_promises', {
                templateUrl : 'views/unnested_promises.html'
            } )
            .otherwise( {
                redirectTo : '/'
            } );
    } )
    .run( ['$rootScope', function ( $rootScope ) {
        $rootScope.$on( '$routeChangeStart', function ( event, noob, old ) {
            // Hacky slide menu close...not very angular
            $( 'button.active' ).trigger( 'click' );
        } );
    }] );


app.controller( 'DelayController', ['$scope', '$q', '$timeout',
    function ( $scope, $q, $timeout ) {

        $scope.countdown = { status: '' };

        var delay = function(ms) {
            var deferred = $q.defer();
            $timeout( deferred.resolve, ms );
            return deferred.promise;
        };

        var done = function() {
            $scope.countdown.status = 'Done!';
        };

        $scope.submit = function ( ms ) {
            $scope.countdown = {
                status : ''
            };

            delay( ms ).then( done );
        }
    }
] );

app.controller( 'CountdownController', ['$scope', '$q', '$timeout',
    function ( $scope, $q, $timeout ) {

        $scope.countdown = { status: '' };

        var delay = function(secs) {
            var deferred = $q.defer();

            var countdown = function() {
                if (--secs == 0) {
                    deferred.resolve();
                } else {
                    deferred.notify( secs );
                    $timeout( countdown, 1000 );
                }
            };

            $timeout(countdown, 1000 );

            deferred.notify( secs );

            return deferred.promise;
        };

        var count = function( secs ) {
            $scope.countdown.status = secs || 'Done!';
        };

        $scope.submit = function ( secs ) {
            $scope.countdown = {
                status : ''
            };

            delay( secs ).then( count, null, count );
        }
    }
] );

app.controller( 'SimpleCallbackController', ['$scope', '$http',
    function ( $scope, $http ) {

        $scope.weather = {};

        $scope.submit = function ( location ) {
            $scope.weather = {
                location : location
            };

            $http.get( 'http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : location
                }
            } ).
                success( function ( data, status ) {
                    var geo = data.results[0];
                    $scope.weather.placename = geo.formatted_address;
                    $scope.weather.lat = geo.geometry.location.lat;
                    $scope.weather.lng = geo.geometry.location.lng;
                } ).
                error( function ( data, status ) {
                    $scope.weather.placename = 'Error getting location information.'
                } );
        };

    }
] );

app.controller( 'ComplexCallbackController', ['$scope', '$http',
    function ( $scope, $http ) {

        $scope.weather = {};

        $scope.submit = function ( location ) {
            $scope.weather = {
                location : location
            };

            $http.get( 'http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : location
                }
            } )
                .success( function ( data, status ) {
                    var geo = data.results[0];
                    $scope.weather.placename = geo.formatted_address;
                    $scope.weather.lat = geo.geometry.location.lat;
                    $scope.weather.lng = geo.geometry.location.lng;

                    var url = 'https://api.forecast.io/forecast/e067c9c9ba111528be5b391a05b82ab1/'
                        + $scope.weather.lat + ',' + $scope.weather.lng;
                    $http.jsonp( url + '?callback=JSON_CALLBACK' )
                        .success( function ( data, status ) {
                            $scope.weather.currentTemp = data.currently.apparentTemperature;
                        } )
                        .error( function ( data, status ) {
                            $scope.weather.placename = 'Error getting weather information.'
                        } );

                    var lastYear = new Date( new Date().getTime() - (365 * 24 * 60 * 60 * 1000) );
                    var strLastYear = lastYear.toISOString().replace( /\.\d+/, '' );
                    var paramLastYear = encodeURI( strLastYear );
                    $http.jsonp( url + ',' + paramLastYear + '?callback=JSON_CALLBACK' )
                        .success( function ( data, status ) {
                            $scope.weather.lastYearTemp = data.currently.apparentTemperature;
                        } )
                        .error( function ( data, status ) {
                            $scope.weather.placename = 'Error getting weather information.'
                        } );
                } )
                .error( function ( data, status ) {
                    $scope.weather.placename = 'Error getting location information.'
                } );
        };

    }
] );

app.controller( 'ServicesBlockingController', ['$scope', 'locationService', '$http',
    function ( $scope, locationService, $http ) {

        $scope.weather = {};

        $scope.submit = function ( location ) {
            $scope.weather = {
                location : location
            };

            // If the service performs a synchronous XHR call, then
            // we can block while we wait for parameters.
            var geo = locationService.geocodeSynchronous( location );
            $scope.weather.placename = geo.placename;
            $scope.weather.lat = geo.lat;
            $scope.weather.lng = geo.lng;

            var url = 'https://api.forecast.io/forecast/e067c9c9ba111528be5b391a05b82ab1/'
                + $scope.weather.lat + ',' + $scope.weather.lng;
            $http.jsonp( url + '?callback=JSON_CALLBACK' )
                .success( function ( data, status ) {
                    $scope.weather.currentTemp = data.currently.apparentTemperature;
                } )
                .error( function ( data, status ) {
                    $scope.weather.placename = 'Error getting weather information.'
                } );

            var lastYear = new Date( new Date().getTime() - (365 * 24 * 60 * 60 * 1000) );
            var strLastYear = lastYear.toISOString().replace( /\.\d+/, '' );
            var paramLastYear = encodeURI( strLastYear );
            $http.jsonp( url + ',' + paramLastYear + '?callback=JSON_CALLBACK' )
                .success( function ( data, status ) {
                    $scope.weather.lastYearTemp = data.currently.apparentTemperature;
                } )
                .error( function ( data, status ) {
                    $scope.weather.placename = 'Error getting weather information.'
                } );
        };

    }
] );

app.controller( 'ServicesHttpController', [
    '$scope', 'locationService', 'weatherService',
    function ( $scope, locationService, weatherService ) {

        $scope.weather = {};

        $scope.submit = function ( location ) {
            $scope.weather = {
                location : location
            };

            locationService.geocodePromise( location )
                .then( function ( result ) {
                    var geo = result.data.results[0];
                    $scope.weather.placename = geo.formatted_address;
                    $scope.weather.lat = geo.geometry.location.lat;
                    $scope.weather.lng = geo.geometry.location.lng;

                    weatherService.currentTempPromise( $scope.weather.lat, $scope.weather.lng )
                        .then( function ( result ) {
                            $scope.weather.currentTemp = result.data.currently.apparentTemperature;
                        }
                    );

                    weatherService.lastYearTempPromise( $scope.weather.lat, $scope.weather.lng )
                        .then( function ( result ) {
                            $scope.weather.lastYearTemp = result.data.currently.apparentTemperature;
                        }
                    );
                }
            );
        };

    }
] );

app.controller( 'ServicesPromisesController', [
    '$scope', 'locationService', 'weatherService',
    function ( $scope, locationService, weatherService ) {

        $scope.weather = {};

        $scope.submit = function ( location ) {
            $scope.weather = {
                location : location
            };

            locationService.geocode( location )
                .then( function ( result ) {
                    $scope.weather.placename = result.placename;
                    $scope.weather.lat = result.lat;
                    $scope.weather.lng = result.lng;

                    weatherService.currentTemp( result.lat, result.lng )
                        .then( function ( result ) {
                            $scope.weather.currentTemp = result;
                        }
                    );

                    weatherService.lastYearTemp( result.lat, result.lng )
                        .then( function ( result ) {
                            $scope.weather.lastYearTemp = result;
                        }
                    );
                }, function ( error ) {
                    $scope.weather.placename = error;
                } );
        };

    }
] );

app.controller( 'UnnestedPromisesController', [
    '$scope', 'locationService', 'weatherService',
    function ( $scope, locationService, weatherService ) {

        $scope.weather = {};

        $scope.submit = function ( location ) {

            var loc;

            $scope.weather = {
                location : location
            };

            var geo = function ( loc ) {
                $scope.weather.placename = loc.placename;
                $scope.weather.lat = loc.lat;
                $scope.weather.lng = loc.lng;

                return loc;
            };

            var current = function ( loc ) {
                return weatherService.currentTemp( loc.lat, loc.lng )
                    .then( function ( result ) {
                        $scope.weather.currentTemp = result;
                    } );
                return loc;
            };

            var prior = function ( loc ) {
                weatherService.lastYearTemp( loc.lat, loc.lng )
                    .then( function ( result ) {
                        $scope.weather.lastYearTemp = result;
                    })
                    .catch(function(error) {

                });

                return loc;
            };

            var error = function ( message ) {
                $scope.weather.placename = message;
            };

            locationService.geocode( location )
                .then( geo )
                .then( current )
                .then( prior )
                .catch( error );

            };
    }
] );

