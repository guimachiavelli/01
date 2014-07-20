var gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	gutil = require('gutil'),
	plumber = require('gulp-plumber'),
	gh_pages = require('gulp-gh-pages'),
	browserify = require('browserify');

gulp.task('default', function() {
	console.log('default task');
});


gulp.task('react', function() {
	var bundleSource = browserify('./src/main.jsx').bundle();

	bundleSource
		.on('error', gutil.log)
		.pipe(plumber())
		.pipe(source('main.js'))
		.pipe(gulp.dest('public/js'));

});

gulp.task('develop', function() {
	gulp.watch(['src/*.jsx', 'src/js/*.js'], ['react']);
});


gulp.task('deploy', function(){
	gulp.src('./public/**/*').pipe(gh_pages());
});
