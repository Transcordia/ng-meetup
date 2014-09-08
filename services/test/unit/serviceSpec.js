describe( 'A service service', function () {
    'use strict';

    beforeEach( function () {
        angular.module( 'test', [] )
            .service( 'mathutil', function () {
                var PI = 3.14159265358979323;

                this.circ_area = function(r) {
                    return PI * r * r;
                };
            } );
        module( 'test' );
    } );

    it( 'initializes the function', function () {
        inject( function ( mathutil ) {
            expect( mathutil.PI ).toBeUndefined();
            expect( mathutil.circ_area( 5 ) ).toBeCloseTo( 78.54, 2 );
        } );
    } );

} );

