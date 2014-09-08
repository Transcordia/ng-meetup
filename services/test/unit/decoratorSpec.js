'use strict';

describe( 'A decorator', function () {

    beforeEach( function () {
        angular.module( 'test', [] )
            .factory( 'mathutil', function () {
                var PI = 3.14159265358979323;

                return {
                    circ_area : function(r) {
                        return PI * r * r;
                    }
                }
            } );
        module( 'test' );
    } );

    it( 'can override existing service functions', function () {
        angular.module( 'test' )
            .config( function ( $provide ) {
                $provide.decorator( 'mathutil', function ( $delegate ) {
                    var areaFunc = $delegate.circ_area;
                    $delegate.circ_area = function() {
                        var args = Array.prototype.slice.call( arguments );
                        var result = areaFunc.apply( null, args );
                        return Math.round( result );
                    };
                    return $delegate;
                } );
            } );

        inject( function ( mathutil ) {
            expect( mathutil.PI ).toBeUndefined();
            expect( mathutil.circ_area( 5 ) ).toBeCloseTo( 79 );
        } );
    } );

    it( 'can extend a service with new functions', function () {
        angular.module( 'test' )
            .config( function ( $provide ) {
                $provide.decorator( 'mathutil', function ( $delegate ) {
                    $delegate.rect_area = function() {
                        var args = Array.prototype.slice.call( arguments );
                        return args[0] * args[0];
                    };
                    return $delegate;
                } );
            } );

        inject( function ( mathutil ) {
            expect( mathutil.rect_area( 5 ) ).toBeCloseTo( 25 );
        } );
    } );

} );
