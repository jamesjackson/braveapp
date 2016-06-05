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

gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
  .pipe(gulp.dest('./public/js'));
});

gulp.task('css', function() {
  return gulp.src('./src/css/*.css')
  .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.ejs', ['html']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/css/*.css', ['css']);
});

gulp.task('default', ['nodemon', 'watch']);
