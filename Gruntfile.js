module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    'js/modules/*.js'
                ],
                dest: 'js/dist/ngshowtime.js',
            },
            css: {
                src: [
                    'css/libs/*.css', 
                    'css/global.css'
                ],
                dest: 'css/dist/showtime.css',
            }
        },
        ngmin: {
            controllers: {
                src: ['js/dist/ngshowtime.js'],
                dest: 'js/dist/showtime.js'
            }
        },
        uglify: {
            build: {
                src: 'js/dist/showtime.js',
                dest: 'js/dist/showtime.min.js'
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
              'css/dist/showtime.min.css': ['css/dist/showtime.css']
            }
          }
        }
    });

    grunt.registerTask('default', ['concat', 'ngmin', 'uglify' , 'cssmin', 'imagemin']); //watch
};