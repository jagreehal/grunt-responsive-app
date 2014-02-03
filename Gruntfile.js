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
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			livereload: {
				options: {
					livereload: '<%= config.livereload %>'
				},
				files: [
					'<%= directories.app %>/index.html'
				]
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'connect', 'watch']);
};