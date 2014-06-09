module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/global.js'  // This specific file
                ],
                dest: 'js/build/production.js',
            },
            css: {
                src: [
                    'css/libs/*.css', // All JS in the libs folder
                    'css/global.css'  // This specific file
                ],
                dest: 'css/build/production.css',
            }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/'
                }]
            }
        },
        cssmin: {
          combine: {
            files: {
              'css/build/production.min.css': ['css/build/production.css']
            }
          }
        },

        watch: {
            scripts: {
                files: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/global.js'  // This specific file
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            } 
        }


    });


    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']); //imagemin
};