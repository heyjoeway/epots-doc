module.exports = function(grunt) {

var BUILD_DIR = "./build/";

grunt.initConfig({
	sass: {
		dist: {
			options: {
				style: "compressed",
			},
			src: "css/style.scss",
			dest: BUILD_DIR + "css/style.min.css"
		},
	},
	htmlmin: {
		dist: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				removeEmptyAttributes: true
			},
			src: "index.html",
			dest: BUILD_DIR + "index.html"
		}
	},
	imagemin: {
		dist: {
			files: [{
				expand: true,
				cwd: 'img/',
				src: '**/*.{png,jpg,gif}',
				dest: BUILD_DIR + "img/"
			},{
				expand: true,
				cwd: 'mat/',
				src: '**/*.{png,jpg,gif}',
				dest: BUILD_DIR + "mat/"
			}]
		}
	},
	uglify: {
		dist: {
			src: 'js/**/*.js',
			dest: BUILD_DIR + "js/script.min.js"
		}
	},
	copy: {
		dist: {
			files: [
				{
					expand: true,
					src: 'font/**',
					dest: BUILD_DIR
				}, {
					expand: true,
					cwd: 'img/',
					src: '**/*.svg',
					dest: BUILD_DIR + "img/"
				}			
			]
		}
	},
	minjson: {
		dist: {
			expand: true,
			cwd: 'geo/',
			src: '**/*.json',
			dest: BUILD_DIR + "geo/"
		}
	},
	// 'string-replace': {
	// 	version: {
	// 		src: BUILD_DIR + "js/script.min.js", 
	// 		dest: BUILD_DIR + "js/script.min.js", 
	// 		options: {
	// 			replacements: [{
	// 				pattern: "{{ VERSION }}",
	// 				replacement: grunt.file.readJSON('package.json').version
	// 			}, {
	// 				pattern: "{{ BUILD }}",
	// 				replacement: grunt.file.readJSON('package.json').build
	// 			}]
	// 		}
	// 	},
	// 	build: {
	// 		src: BUILD_DIR + "js/script.min.js", 
	// 		dest: BUILD_DIR + "js/script.min.js", 
	// 		options: {
	// 			replacements: [{
	// 				pattern: "{{ DATA_URL }}",
	// 				replacement: grunt.file.readJSON('package.json').urlDataBuild
	// 			}]
	// 		}
	// 	},
	// 	test: {
	// 		src: BUILD_DIR + "js/script.min.js", 
	// 		dest: BUILD_DIR + "js/script.min.js", 
	// 		options: {
	// 			replacements: [{
	// 				pattern: "{{ DATA_URL }}",
	// 				replacement: grunt.file.readJSON('package.json').urlDataTest
	// 			}]
	// 		}
	// 	}
	// },
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-minjson');
// grunt.loadNpmTasks('grunt-string-replace');

grunt.registerTask('default', [
	'sass',
	'htmlmin',
	'imagemin',
	'uglify',
	'copy',
	'minjson'
	// 'string-replace:version'
]);

// grunt.registerTask('build',[
// 	'common',
// 	'string-replace:build'
// ]);

// grunt.registerTask('test',[
// 	'common',
// 	'string-replace:test'
// ]);

// grunt.registerTask('default', ['test']);

};