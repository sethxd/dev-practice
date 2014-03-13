module.exports = function(grunt){
	
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		htmlhint: {
			build: {
				options: {
					'tag-pair': true,
					'tagname-lowercase': true,
					'attr-lowercase': true,
					'attr-value-double-quotes': true,
					'doctype-first': true,
					'spec-char-escape': true,
					'id-unique': true,
					'head-script-disabled': true,
					'style-disabled': true
				},
				src: ['index.html']
			},
		},

		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"css/default.css": "src/less/styles.less"
				}
			}
		},

		watch: {
			html: {
				files: ['index.html'],
				tasks: ['htmlhint'],
				options: {
					livereload: true,
				}
			},

			styles: {
				files: ['src/less/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true,
					livereload: true
				}
			},
			
			js: {
				files: ['assets/js/base.js'],
				tasks: ['uglify']
			},
		},

		uglify: {
			build: {
				files: {
					'build/js/base.min.js': ['assets/js/base.js']
				}
			}
		},

		pkg: grunt.file.readJSON('package.json')
	});

	grunt.registerTask('default', ['watch']);

};