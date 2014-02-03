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
		clean: {
			dist: {
				files: [
					{
						dot: true,
						src: [
							'<%= directories.dist %>/*',
							'.tmp'
						]
					}
				]
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
		copy: {
			bad: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= directories.app %>',
						dest: '<%= directories.dist %>',
						src: [
							'**/*.*'
						]
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= directories.app %>',
						dest: '<%= directories.dist %>',
						src: [
							'*.{ico}',
							'styles/icons/*.css',
							'styles/icons/png/*.png'
						]
					}
				]
			}
		},
		grunticon: {
			iconify: {
				files: [
					{
						expand: true,
						cwd: '<%= directories.app %>/images/icons-src',
						src: ['*.svg', '*.png'],
						dest: '<%= directories.app %>/styles/icons'
					}
				]
			}
		},
		htmlmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= directories.app %>',
						src: 'index.html',
						dest: '<%= directories.dist %>'
					}
				]
			}
		},
		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= directories.app %>/images',
						src: ['products/main/*.{gif,jpeg,jpg,png}', 'products/thumbnails/*.{gif,jpeg,jpg,png}'],
						dest: '<%= directories.dist %>/images'
					}
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
		responsive_images: {
			options: {
				sizes: [
					{
						name: 'small',
						width: 320
					},
					{
						name: 'medium',
						width: 640
					},
					{
						name: 'large',
						width: 960
					}
				]
			},
			files: {
				expand: true,
				cwd: '<%= directories.app %>/images/products/main-src',
				src: '*.{jpg,gif,png}',
				dest: '<%= directories.app %>/images/products/main'
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= directories.dist %>/scripts/{,*/}*.js',
						'<%= directories.dist %>/styles/**/*.css',
						'<%= directories.dist %>/images/**/*.{gif,jpeg,jpg,png,webp}'
					]
				}
			}
		},
		smushit: {
			main: {
				files: [
					{
						expand: true,
						src: ['<%= directories.app %>/images/products/main/*.{gif,jpeg,jpg,png}'],
						dest: '<%= directories.dist %>/images/products/main'
					}
				]
			},
			thumbnails: {
				files: [
					{
						expand: true,
						src: ['<%= directories.app %>/images/products/thumbnails/*.{gif,jpeg,jpg,png}'],
						dest: '<%= directories.dist %>/images/products/thumbnails'
					}
				]
			}
		},
		svgmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= directories.app %>/icons-src',
						src: '{,*/}*.svg',
						dest: '<%= directories.app %>/icons-src'
					}
				]
			}
		},
		useminPrepare: {
			options: {
				dest: '<%= directories.dist %>'
			},
			html: '<%= directories.app %>/index.html'
		},
		usemin: {
			options: {
				assetsDirs: ['<%= directories.dist %>']
			},
			html: ['<%= directories.dist %>/{,*/}*.html'],
			css: ['<%= directories.dist %>/styles/*.css']
		},
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			html: {
				files: ['<%= directories.app %>/index.tmp.html'],
				tasks: ['injectBrowserSync:dev']
			},
			less: {
				files: ['<%= directories.app %>/styles/**/*.less'],
				tasks: ['less', 'autoprefixer']
			},
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

	grunt.registerMultiTask('injectBrowserSync', function(){
		var template = grunt.file.read('app/index.tmp.html');
		var output = grunt.template.process(template, {data: {'browserSyncScripts': this.data.files}});
		grunt.file.write('app/index.html', output);
	});

	grunt.registerTask('build', [
		'jshint',
		'clean:dist',
		'grunticon',
		'responsive_images',
		'injectBrowserSync:dist',
		'useminPrepare',
		'less',
		'smushit',
		'svgmin',
		'htmlmin',
		'less',
		'cmq',
		'autoprefixer',
		'copy:dist',
		'useminPrepare',
		'concat',
		'uglify',
		'cssmin',
		'rev',
		'usemin'
	]);

	grunt.registerTask('bad', [
		'jshint',
		'clean:dist',
		'grunticon',
		'responsive_images',
		'injectBrowserSync:dist',
		'less',
		'less',
		'autoprefixer',
		'copy:bad'
	]);

	grunt.registerTask('default', ['injectBrowserSync:dev', 'jshint', 'less', 'cmq', 'autoprefixer', 'grunticon', 'connect', 'browser_sync', 'watch']);
};