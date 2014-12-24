var gulp = require('gulp' ),
    plugins = require('gulp-load-plugins')({lazy:false});

gulp.task('protractor', ['connect'], function() {
  return gulp.src('undefined.js')
    .pipe(plugins.protractor.protractor({
      configFile: 'ptor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:8080']
    }))
    .on('error', function(e) { throw e; })
    .pipe(plugins.exit());
});

