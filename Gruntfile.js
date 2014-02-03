'use strict';
module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		directories: {app: 'app', dist: 'dist'},
		config: grunt.file.readJSON('config.json'),
		autoprefixer: {
			options: {
				browsers: ['last 10 version']
			},
			prefix: {
				files: {
					'<%= directories.app %>/styles/style.css': '<%= directories.app %>/styles/style.css'
				}
			}
		},
		browser_sync: {
			bsFiles: {
				src: '<%= directories.app %>/styles/style.css'
			},
			options: {
				watchTask: true,
				host: '<%= config.hostname %>'
			}
		},
		bump: {
			options: {
				commitFiles: ['-a'],
				pushTo: 'https://github.com/jagreehal/grunt-responsive-app'
			}
		},
		cmq: {
			options: {
				log: true
			},
			combine: {
				files: {
					'<%= directories.app %>/styles/style.css': '<%= directories.app %>/styles/style.css'
				}
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
			html:{
				files: ['<%= directories.app %>/index.tmp.html'],
				tasks:['injectBrowserSync:dev']
			},
			less: {
				files: ['<%= directories.app %>/styles/**/*.less'],
				tasks: ['less','autoprefixer']
			},
			livereload: {
				options: {
					livereload: '<%= config.livereload %>'
				},
				files: [
					'<%= directories.app %>/index.html'
				]
			}
		},
		injectBrowserSync: {
			dev: {
				files: '<script src="//<%= config.hostname %>:3000/socket.io/socket.io.js"></script>' +
					'<script>var ___socket___ = io.connect("http://<%= config.hostname %>:3000")</script>' +
					'<script src="//<%= config.hostname %>:3001/client/browser-sync-client.min.js"></script>'
			},
			dist: {
				files: ''
			}
		}
	});

	grunt.registerMultiTask('injectBrowserSync', function(){
		var template = grunt.file.read('app/index.tmp.html');
		var output = grunt.template.process(template, {data: {'browserSyncScripts': this.data.files}});
		grunt.file.write('app/index.html', output);
	});

	grunt.registerTask('default', ['injectBrowserSync:dev', 'jshint', 'less', 'cmq', 'autoprefixer', 'connect', 'browser_sync', 'watch']);
};