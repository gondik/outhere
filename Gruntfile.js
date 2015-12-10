module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'public/src/js/**/*.js'],
            options: {
                globals: {
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'public/dist/js/main.js': ['public/src/js/**/*.js']
                },
                options: {
                }
            }
        },
        less: {
            build: {
                files: {
                    'public/dist/css/main.css': 'public/src/less/main.less'
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'public/dist/css/main.min.css': 'public/dist/css/main.css'
                }
            }
        },
        watch: {
            // for stylesheets, watch css and less files
            // only run less and cssmin
            stylesheets: {
                files: ['public/src/less/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            // for scripts, run jshint and uglify
            scripts: {
                files: ['public/src/js/**/*.js'],
                tasks: ['jshint', 'browserify']
            }
        }
	});

    grunt.registerTask('dev', [
        'browserify',
		'less',
        'cssmin'
    ]);

    grunt.registerTask('production', [
        'jshint',
		'browserify',
		'less',
        'cssmin'
    ]);

    grunt.registerTask('build', [
		'jshint',
		'browserify',
		'less',
        'cssmin'
	]);

	grunt.registerTask('default', [
        'jshint',
		'browserify',
		'less',
        'cssmin'
	]);
};
