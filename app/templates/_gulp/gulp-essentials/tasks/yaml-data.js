var gulp = require('gulp'),
  env = require('../util/env-check'),
  gp = require('gulp-load-plugins')({lazy:false});


gulp.task('yaml-data', function() {
  return gulp.src('data-structure/**/*.yml')
    .pipe(gp.yaml({pretty: true}))
    .pipe(gulp.dest(env.outputDir + '/data'))
    .pipe(gp.connect.reload())
    .pipe(gp.notify({onLast: true, title:'yaml-data', message:'done'}));
});
