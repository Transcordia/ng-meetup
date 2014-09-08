'use strict';


describe( 'A simple factory service', function () {

    beforeEach( function () {
        angular.module( 'test', [] )
            .factory( 'mathutil', function () {
                return {
                    PI : 3.14159265358979323,
                    circ_area : function(r) {
                        return this.PI * r * r;
                    }
                }
            } );
        module( 'test' );
    } );

    it( 'can be very similar to a value service', function () {
        inject( function ( mathutil ) {
            expect( mathutil.PI ).toBeCloseTo( 3.1416, 4 );
            expect( mathutil.circ_area( 5 ) ).toBeCloseTo( 78.54, 2 );
        } );
    } );

} );

describe( 'A factory service', function () {

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

    it( 'can have private properties and functions', function () {
        inject( function ( mathutil ) {
            expect( mathutil.PI ).toBeUndefined();
            expect( mathutil.circ_area( 5 ) ).toBeCloseTo( 78.54, 2 );
        } );
    } );

} );
