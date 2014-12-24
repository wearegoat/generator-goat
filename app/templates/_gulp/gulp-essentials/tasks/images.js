var gulp = require('gulp'),
  env = require('../util/env-check'),
  plugins = require('gulp-load-plugins')({lazy:false});

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest(env.outputDir + '/images'))
    .pipe(plugins.connect.reload());
});
