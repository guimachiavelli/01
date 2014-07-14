var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify');

gulp.task('default', function() {
	console.log('default task');
});


gulp.task('react', function() {
	var bundleSource = browserify('./src/main.jsx').bundle();

	bundleSource
		.pipe(source('main.js'))
		.pipe(gulp.dest('public/js'));

});

gulp.task('react:watch', function() {
	gulp.watch('src/*.jsx', ['react']);
});
