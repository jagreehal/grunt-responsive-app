'use strict';
module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		directories: {app: 'app', dist: 'dist'},
		config: grunt.file.readJSON('config.json'),
		bump: {
			options: {
				commitFiles: ['-a'],
				pushTo: 'https://github.com/jagreehal/grunt-responsive-app'
			}
		},
		connect: {
			options: {
				port: '<%= config.port %>',
				livereload: '<%= config.livereload %>',
				hostname: '<%= config.hostname %>'
			},
			server: {
				options: {
					open: true,
					base: [
						'<%= directories.app %>'
					]
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js'
			]
		},
		less: {
			compile: {
				files: {
					'<%= directories.app %>/styles/style.css': '<%= directories.app %>/styles/style.less'
				}
			}
		},
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			less: {
				files: ['<%= directories.app %>/styles/**/*.less'],
				tasks: ['less']
			},
			livereload: {
				options: {
					livereload: '<%= config.livereload %>'
				},
				files: [
					'<%= directories.app %>/index.html',
					'<%= directories.app %>/styles/style.css'
				]
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'less', 'connect', 'watch']);
};