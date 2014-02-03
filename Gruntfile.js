'use strict';
module.exports = function(grunt){
	// Load all tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		directories: {app: 'app', dist: 'dist'},
		config: grunt.file.readJSON('config.json'),
		bump: {
			options: {
				commitFiles: ['-a'],
				pushTo: 'https://github.com/jagreehal/grunt-responsive-app'
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
		}
	});

	grunt.registerTask('default', ['jshint']);
};