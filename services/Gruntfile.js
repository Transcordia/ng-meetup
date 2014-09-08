module.exports = function ( grunt ) {

    grunt.loadNpmTasks( 'grunt-karma');
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );

    grunt.initConfig( {
        pkg : grunt.file.readJSON( 'package.json' ),

        karma : {
            unit : {
                configFile : 'karma.conf.js'
            }
        },

        jshint : {
            files : ['Gruntfile.js', 'test/**/*.js'],
            options : {
                jshintrc : '.jshintrc'
            }
        }
    } );

    grunt.registerTask( 'default', ['jshint', 'karma'] );
};
