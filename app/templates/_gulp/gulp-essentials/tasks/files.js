var gulp = require('gulp'),
  env = require('../util/env-check'),
  gp = require('gulp-load-plugins')({lazy:false});

gulp.task('files', function() {
  return gulp.src('app/files/*')
    .pipe(gulp.dest(env.outputDir + '/files'))
    .pipe(gp.connect.reload());
});
