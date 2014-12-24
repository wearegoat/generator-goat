var gulp = require('gulp'),
  env = require('../util/env-check'),
  gp = require('gulp-load-plugins')({lazy:false});


gulp.task('css-images', function() {
  return gulp.src('app/styles/css-images/**/*')
    .pipe(gulp.dest(env.outputDir + '/styles/css-images'))
    .pipe(gp.connect.reload());
});
