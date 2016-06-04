var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;
var ejs = require("gulp-ejs");
var gutil = require('gulp-util');
var ext_replace = require('gulp-ext-replace');

gulp.task('nodemon', function() {
  nodemon({
    script: 'index.js',
    ext: 'js html'
    // other config ...
  });
});

gulp.task('html', function(){
  return gulp.src('./src/*.ejs')
  .pipe(ejs({})
  .on('error', gutil.log))
  .pipe(ext_replace('.html', '.html.ejs'))
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.ejs', ['html']);
});

gulp.task('default', ['html', 'nodemon', 'watch']);
