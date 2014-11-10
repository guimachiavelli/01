var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    gutil = require('gutil'),
    plumber = require('gulp-plumber'),
    gh_pages = require('gulp-gh-pages'),
    browserify = require('browserify');

gulp.task('default', function() {
    console.log('default task');
});


gulp.task('bundle', function() {
    var bundleSource = browserify('./src/js/main.js').bundle();

    bundleSource
        .on('error', gutil.log)
        .pipe(plumber())
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/js'));

});

gulp.task('develop', function() {
    gulp.watch(['src/js/*.js'], ['bundle']);
});


gulp.task('deploy', function(){
    gulp.src('./public/**/*').pipe(gh_pages());
});
