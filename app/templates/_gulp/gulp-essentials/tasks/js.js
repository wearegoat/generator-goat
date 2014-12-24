var gulp = require('gulp'),
  env = require('../util/env-check'),
  gp = require('gulp-load-plugins')({lazy:false});

gulp.task('js', ['jshint'], function() {
  return gulp.src('app/**/*.js')
    .pipe(gp.if(env.env === 'production', gp.uglify()))
    .pipe(gp.if(env.env === 'production', gp.angularFilesort()))
    .pipe(gp.if(env.env === 'production', gp.concat('scripts.js')))
    .pipe(gp.if(env.env === 'production', gulp.dest(env.outputDir + '/scripts'), gulp.dest(env.outputDir)))
    .pipe(gp.connect.reload())
    .pipe(gp.notify({onLast: true, title:'js', message:'done'}));
});
