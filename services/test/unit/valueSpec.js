'use strict';

describe( 'Value service', function () {

    beforeEach( function () {
        angular.module( 'test', [] )
            .value( 'astring', 'some text value' )
            .value( 'anumber', 7 )
            .value( 'anobject', {name : 'fred'} )
            .value( 'afunction', function ( incr ) {
                return incr + 1
            } );
        module( 'test' );
    } );

    it( 'should expose primitive values', function () {
        inject( function ( astring, anumber ) {
            expect( astring ).toBe( 'some text value' );
            expect( anumber ).toBe( 7 );
        } );
    } );

    it( 'should expose an object', function () {
        inject( function ( anobject ) {
            expect( anobject ).toEqual( {name : 'fred'} );
        } );
    } );

    it( 'should expose a function', function () {
        inject( function ( afunction ) {
            expect( afunction(7) ).toBe( 8 );
            expect( afunction('1') ).toBe( '11' );
        } );
    } );

} );
