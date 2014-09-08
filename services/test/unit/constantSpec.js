describe( 'Constant service', function () {
    'use strict';

    beforeEach( function () {
        angular.module( 'test', [] )
            .constant( 'const_string', 'some text value' )
            .constant( 'const_number', 42 )
            .constant( 'const_object', {name : 'fred'} )
            .constant( 'const_function', function ( incr ) {
                return incr + 1;
            } );
        module( 'test' );
    } );

    it( 'should expose primitive values', function () {
        inject( function ( const_string, const_number, const_object ) {
            expect( const_string ).toBe( 'some text value' );
            expect( const_number ).toBe( 42 );
            expect( const_object ).toEqual( {name : 'fred'} );
        } );
    } );

    it( 'should expose a function', function () {
        inject( function ( const_function ) {
            expect( const_function( 7 ) ).toBe( 8 );
            expect( const_function( '1' ) ).toBe( '11' );
        } );
    } );

    it( 'cannot be modified', function () {
        angular.module( 'test' )
            .constant( 'const_number', 7 );

        inject( function ( const_number ) {
            expect( const_number ).not.toBe( 7 );
        } );
    } );

} );
