var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

gulp.task('nodemon', function() {
  nodemon({
    script: 'index.js',
    ext: 'js html'
    // other config ...
  });
});

gulp.task('default', function() {
  exec('source ./private/env-vars')
});

gulp.task('default', ['nodemon']);
