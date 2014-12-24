var gulp = require('gulp'),
  env = require('../util/env-check'),
  mainBowerFiles = require('main-bower-files'),
  gp = require('gulp-load-plugins')({lazy:false});

gulp.task('vendor', function() {
  return gulp
    .src(
      mainBowerFiles({paths: '.' , env: 'development', filter:/\.js$/, includeDev: true }),
      { base:'bower_components' }
    )
    .pipe(gulp.dest(env.outputDir + '/bower_components'))
    .pipe(gp.connect.reload())
    .pipe(gp.notify({onLast: true, title:'', message:'vendor done'}));
});
