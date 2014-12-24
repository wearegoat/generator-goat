var gulp = require('gulp'),
  env = require('../util/env-check'),
  gp = require('gulp-load-plugins')({lazy:false});

gulp.task('fonts', function() {
  return gulp.src('app/styles/fonts/*')
    .pipe(gulp.dest(env.outputDir + '/styles/fonts'))
    .pipe(gp.connect.reload());
});
