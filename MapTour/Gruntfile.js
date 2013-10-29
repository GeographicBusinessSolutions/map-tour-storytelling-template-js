(function() {
	module.exports = function(grunt) {
		var APP_NAME = 'maptour';
		
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			
			clean: {
				deploy: ['deploy/gbstrafficcameras/'],
				css: [
					'deploy/gbstrafficcameras/app/Responsive.css',
					'deploy/gbstrafficcameras/app/css/',
					'deploy/gbstrafficcameras/app/' + APP_NAME + '-css-app-min.css',
					'deploy/gbstrafficcameras/app/' + APP_NAME + '-css-lib-min.css'
				],
				jsLib: ['deploy/gbstrafficcameras/app/lib/'],
				jsTmp: [
					'deploy/gbstrafficcameras/app/' + APP_NAME + '-app-viewer-min.js',
					'deploy/gbstrafficcameras/app/' + APP_NAME + '-app-builder-min.js',
					'deploy/gbstrafficcameras/app/' + APP_NAME + '-lib-min.js'
				]
			},
			
			concat: {
				options: {separator: ';'},
				jsLib: {
					src: ['deploy/gbstrafficcameras/app/lib/**/*.js'],
					dest: 'deploy/gbstrafficcameras/app/' + APP_NAME + '-lib-min.js'
				},
				viewerJS: {
					src: ['deploy/gbstrafficcameras/app/' + APP_NAME + '-lib-min.js', 'deploy/gbstrafficcameras/app/' + APP_NAME + '-app-viewer-min.js'],
					dest: 'deploy/gbstrafficcameras/app/' + APP_NAME + '-viewer-min.js'
				},
				builderJS: {
					src: ['deploy/gbstrafficcameras/app/' + APP_NAME + '-lib-min.js', 'deploy/gbstrafficcameras/app/' + APP_NAME + '-app-builder-min.js'],
					dest: 'deploy/gbstrafficcameras/app/' + APP_NAME + '-builder-min.js'
				},
				css: {
					src: ['deploy/gbstrafficcameras/app/' + APP_NAME + '-css-lib-min.css', 'deploy/gbstrafficcameras/app/' + APP_NAME + '-css-app-min.css'],
					dest: 'deploy/gbstrafficcameras/app/' + APP_NAME + '-min.css'
				}
			},
			
			uglify: {
				jsLib: {
					files: [{
						expand: true,
						cwd: 'src/lib',
						src:['**/*.js'],
						dest: 'deploy/gbstrafficcameras/app/lib',
					}]
				}
			},
			
			requirejs: {
			  viewer: {
				options: {
				  baseUrl: "src/app/",
					paths: {
						'dojo': 'empty:',
						'esri': 'empty:',
						'dijit': 'empty:',
						'dojox': 'empty:'
					},
					name: 'storymaps/' + APP_NAME + '/BuildConfigViewer',
					out: 'deploy/gbstrafficcameras/app/' + APP_NAME + '-app-viewer-min.js'
				}
			},
			builder: {
				options: {
					baseUrl: "src/app/",
					paths: {
						'dojo': 'empty:',
						'esri': 'empty:',
						'dijit': 'empty:',
						'dojox': 'empty:'
					},
					name: 'storymaps/' + APP_NAME + '/BuildConfigBuilder',
					out: 'deploy/gbstrafficcameras/app/' + APP_NAME + '-app-builder-min.js'
				}
			  }
			},
			
			cssmin: {
					app: {
						src: ['deploy/gbstrafficcameras/app/css/**/*.css', 'deploy/gbstrafficcameras/app/Responsive.css'],
						dest: 'deploy/gbstrafficcameras/app/' + APP_NAME + '-css-app-min.css'
					},
					lib: {
						src: ['src/lib/**/*.css'],
						dest: 'deploy/gbstrafficcameras/app/' + APP_NAME + '-css-lib-min.css'
					}
				
			},
			
			copy: {
				css: {
					files: [
						{
							expand: 'true',
							cwd: 'src/app/',
							src: ['**/*.css'],
							dest: 'deploy/gbstrafficcameras/app/css/'
						}
					]
				},
				html: {
					files: [{
						expand: true,
						cwd: 'src',
						src:['*.html'],
						dest: 'deploy/gbstrafficcameras/'
					}]
				},
				resources: {
					files: [{
						expand: true,
						cwd: 'src',
						src:['resources/**'],
						dest: 'deploy/gbstrafficcameras/'
					}]
				},
				config: {
					files: [{
						expand: true,
						cwd: 'src',
						src:['app/' + APP_NAME + '-config.js'],
						dest: 'deploy/gbstrafficcameras/'
					}]
				},
				commonConfig: {
					files: [{
						expand: true,
						cwd: 'src/app',
						src:['commonConfig.js'],
						dest: 'deploy/gbstrafficcameras/app'
					}]
				},
				bootstrapResources: {
					files: [{
						expand: true,
						cwd: 'src/lib/bootstrap/img/',
						src:['*'],
						dest: 'deploy/gbstrafficcameras/resources/bootstrap/'
					}]
				}
			},
			
			rename: {
				moveResponsiveCss: {
					src: 'deploy/gbstrafficcameras/app/css/storymaps/' + APP_NAME + '/ui/Responsive.css',
					dest: 'deploy/gbstrafficcameras/app/Responsive.css'
				}
			},
			
			"regex-replace": {
				css: {
					src: ['deploy/gbstrafficcameras/app/' + APP_NAME + '-min.css'],
					actions: [
						{
							name: 'Project images path',
							search: '../../(../)*',
							replace: '../',
							flags: 'g'
						},
						{
							name: 'Bootstrap images path',
							search: '../img/',
							replace: '../resources/bootstrap/',
							flags: 'g'
						}
					]
				},
				js: {
					src: ['deploy/gbstrafficcameras/app/*.js'],
					actions: [
						{
							name: 'Minified JS variable 1',
							search: 'TPL_ENV_DEV',
							replace: 'TPL_ENV_PRODUCTION'
						},
						{
							name: 'Minified JS variable 2',
							search: 'TPL_PREVIEW_TRUE',
							replace: 'TPL_PREVIEW_FALSE'
						}
					]
				},
				index: {
					src: ['deploy/gbstrafficcameras/index.html'],
					actions: [
						{
							name: 'Index.html variables',
							search: 'var isProduction = false;',
							replace: 'var isProduction = true;'
						}
					]
				}
			},
			
			jshint: {
				files: ['src/app/**/*.js'],
				options: {jshintrc: '.jshintrc'}
			},
			
			connect: {
				server: {
					options: {
						port: 8080,
						keepalive: true
					}
				}
			},
			
			watch: {
				files: ['src/app/**/*.js'],
				tasks: ['jshint']
			}
		});
		
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-requirejs');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.loadNpmTasks('grunt-regex-replace');
		grunt.loadNpmTasks('grunt-rename');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-watch');
		
		grunt.registerTask('test', ['jshint']);
		/* Run 'start grunt server' or 'grunt server &' to create a web server on port 8080 */
		grunt.registerTask('server', ['connect']);
		
		grunt.registerTask('default', [
			/* Comment out to disable code linting */
			'jshint',
			'clean:deploy', 
			
			/* 
			 * Minify and concat external libraries JS using uglify
			 */
			'uglify:jsLib', 
			'concat:jsLib',
			'clean:jsLib',
			
			/*
			 * Minify project JS using require.js
			 * - require.js output a .js for with only the viewer and a .js with viewer and builder
			 * - concat those .js with lib's JS
			 * - perform production mode replacement in JS files
			 */
			'requirejs',
			'concat:viewerJS',
			'concat:builderJS',
			'clean:jsTmp', 
			'regex-replace:js',
			
			/*
			 * Minify CSS
			 * - start by copying all project's css in a tmp folder and exclude Responsive.css
			 * - minify CSS of the application (Responsive.css is added at the end) and libraries CSS
			 * - concat libraries css and application css
			 * - perform resources path replacement
			 */
			'copy:css',
			'rename:moveResponsiveCss',
			'cssmin',
			'concat:css',
			'regex-replace:css',
			'clean:css',
			
			'copy:html',
			'regex-replace:index',
			'copy:config',
			'copy:commonConfig',
			'copy:bootstrapResources',
			'copy:resources'
		]);
	};
})();