const gulp = require('gulp'),
	sass = require('gulp-sass'),
	babel = require("gulp-babel"),
	path = require('path');

gulp.task('es6', () => {
	return gulp.src(path.join(__dirname, 'app/js/app.js'))
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(gulp.dest(path.join(__dirname, "/dist/js/")))
})

gulp.task('build', ['es6'], () => {
	// Make a build
	// Transpilation es6 to es5
	// Then ...
})