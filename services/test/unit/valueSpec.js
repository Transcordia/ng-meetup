describe( 'Value service', function () {
    'use strict';

    beforeEach( function () {
        angular.module( 'test', [] )
            .value( 'val_string', 'some text value' )
            .value( 'val_number', 42 )
            .value( 'val_object', {name : 'fred'} )
            .value( 'val_function', function ( incr ) {
                return incr + 1;
            } );
        module( 'test' );
    } );

    it( 'should expose primitive values', function () {
        inject( function ( val_string, val_number, val_object ) {
            expect( val_string ).toBe( 'some text value' );
            expect( val_number ).toBe( 42 );
            expect( val_object ).toEqual( {name : 'fred'} );
        } );
    } );

    it( 'should expose a function', function () {
        inject( function ( val_function ) {
            expect( val_function(7) ).toBe( 8 );
            expect( val_function('1') ).toBe( '11' );
        } );
    } );

    it( 'value services can be modified', function () {
        angular.module( 'test' )
            .value( 'val_number', 7 );
        inject( function ( val_number ) {
            expect( val_number ).toBe( 7 );
        } );
    } );

} );
