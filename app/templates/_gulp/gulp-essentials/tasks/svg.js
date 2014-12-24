var gulp = require('gulp'),
  env = require('../util/env-check'),
  plugins = require('gulp-load-plugins')({lazy:false});

gulp.task('svg', function() {
  return gulp.src('app/svg/**/*')
    .pipe(gulp.dest(env.outputDir + '/svg'))
    .pipe(plugins.connect.reload());
});
