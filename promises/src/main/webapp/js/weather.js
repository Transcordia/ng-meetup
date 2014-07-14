var app = angular.module( 'weather', [] );

app.service( 'weatherService', ['$http', '$q', function ( $http, $q ) {

    return {
        currentTempPromise : function ( lat, lng ) {
            return $http.jsonp(
                    'https://api.forecast.io/forecast/e067c9c9ba111528be5b391a05b82ab1/'
                    + lat + ',' + lng + '?callback=JSON_CALLBACK'
            );
        },

        lastYearTempPromise : function ( lat, lng ) {
            var url = 'https://api.forecast.io/forecast/e067c9c9ba111528be5b391a05b82ab1/'
                + lat + ',' + lng;
            var lastYear = new Date( new Date().getTime() - (365 * 24 * 60 * 60 * 1000) );
            var strLastYear = lastYear.toISOString().replace( /\.\d+/, '' );
            var paramLastYear = encodeURI( strLastYear );

            return $http.jsonp( url + ',' + paramLastYear + '?callback=JSON_CALLBACK' );
        },

        currentTemp : function ( lat, lng ) {
            var deferred = $q.defer();

            $http.jsonp(
                    'https://api.forecast.io/forecast/e067c9c9ba111528be5b391a05b82ab1/'
                    + lat + ',' + lng + '?callback=JSON_CALLBACK'
            )
                .success( function ( data, status ) {
                    deferred.resolve( data.currently.apparentTemperature );
                } )
                .error( function ( data, status ) {
                    deferred.reject( 'Error getting current weather information.' );
                } );

            return deferred.promise;
        },

        lastYearTemp : function ( lat, lng ) {
            var url = 'https://api.forecast.io/forecast/e067c9c9ba111528be5b391a05b82ab1/'
                + lat + ',' + lng;

            var lastYear = new Date( new Date().getTime() - (365 * 24 * 60 * 60 * 1000) );
            var strLastYear = lastYear.toISOString().replace( /\.\d+/, '' );
            var paramLastYear = encodeURI( strLastYear );

            var deferred = $q.defer();

            $http.jsonp( url + ',' + paramLastYear + '?callback=JSON_CALLBACK' )
                .success( function ( data, status ) {
                    deferred.resolve( data.currently.apparentTemperature );
                } )
                .error( function ( data, status ) {
                    deferred.reject( 'Error getting last year\'s information.' );
                } );

            return deferred.promise;
        }
    }

} ] );

