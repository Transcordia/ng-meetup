var app = angular.module( 'location', [] );

app.service( 'locationService', ['$http', '$q', function ( $http, $q ) {

    return {
        geocodeSynchronous : function ( location ) {
            var result = {};

            $.ajax( {
                method: 'GET',
                url: 'http://maps.googleapis.com/maps/api/geocode/json',
                async: false,
                data : {
                    address : location
                },
                success: function(data, status) {
                    var geo = data.results[0];

                    result.placename = geo.formatted_address;
                    result.lat = geo.geometry.location.lat;
                    result.lng = geo.geometry.location.lng;
                },
                error: function(xhr, status) {
                    throw 'Error getting location information.';
                }
            });

            return result;
        },

        geocodePromise : function ( location ) {
            return $http.get( 'http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : location
                }
            } );
        },

        geocode : function ( location ) {
            var deferred = $q.defer();

            $http.get( 'http://maps.googleapis.com/maps/api/geocode/json', {
                params : {
                    address : location
                }
            } )
                .success(function( data, status) {
                    if ( /ZERO_RESULTS/.test( data.status ) )  {
                        deferred.reject( 'Error getting location information.' );
                        return;
                    }

                    var geo = data.results[0];
                    deferred.resolve( {
                        placename : geo.formatted_address,
                        lat : geo.geometry.location.lat,
                        lng : geo.geometry.location.lng
                    } );

                }).error(function(data, status) {
                    deferred.reject( 'Error getting location information.' );
                });

            return deferred.promise;
        }
    }
} ] ) ;

