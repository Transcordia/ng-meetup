describe( 'A provider service', function () {

    'use strict';

    it( 'requires a $get function', function () {
        angular.module( 'testfail', [] ).
            provider( 'badProvider', function () {
            } );
        expect( function () {
            inject( function ( badProvider ) {
            } );
        } ).toThrow();
    } );

    describe( 'may be configurable', function () {

        beforeEach( function () {
            angular.module( 'test', [] )
                .provider( 'greeter', function () {
                    var location = 'New York City';

                    this.setLocation = function ( loc ) {
                        location = loc;
                    };

                    this.$get = function () {
                        return {
                            greeting : function ( name ) {
                                return 'Hello ' + name + ', from ' + location;
                            }
                        };
                    };
                } );
            module( 'test' );
        } );

        it( 'from hawaii', function () {
            angular.module( 'test' )
                .config( function ( greeterProvider ) {
                    greeterProvider.setLocation( 'Honolulu' );
                } );

            inject( function ( greeter ) {
                expect( greeter.greeting('Fred')).toBe( 'Hello Fred, from Honolulu' );
            } );
        } );
    } );

} );

