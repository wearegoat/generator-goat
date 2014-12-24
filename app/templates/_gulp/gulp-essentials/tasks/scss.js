var gulp = require('gulp'),
  env = require('../util/env-check'),
  gp = require('gulp-load-plugins')({lazy:false});

gulp.task('scss', function() {
  var config = {};

  if (env.env === 'development') {
    config.errLogToConsole = true;
    config.sourceComments = 'map';
  } else if (env.env === 'production') {
    config.outputStyle = 'compressed';
  }

  config.includePaths = [
    require('node-bourbon').includePaths
  ];
  if (env.env === 'development'){
    return gulp.src(['app/main.scss'])
      .pipe(gp.sourcemaps.init())
      .pipe(gp.sass(config))
      .on('error', gp.util.log)
      .pipe(gp.sourcemaps.write())
      .pipe(gulp.dest(env.outputDir + '/styles'))
      .pipe(gp.connect.reload())
      .pipe(gp.notify({onLast: true, title:'sass', message:'done'}));
  } else {
    return gulp.src(['app/main.scss'])
      .pipe(gp.sass(config))
      .on('error', gp.util.log)
      .pipe(gp.csslint())
      .pipe(gp.csso())
      .pipe(gulp.dest(env.outputDir + '/styles'));
  }
});
