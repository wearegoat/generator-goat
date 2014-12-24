var gulp = require('gulp' ),
    plugins = require('gulp-load-plugins')({lazy:false});

gulp.task('protractor-remote', function() {
  return gulp.src('undefined.js')
    .pipe(plugins.protractor.protractor({
      configFile: 'ptor.conf.js',
      args: ['--baseUrl', process.env.PTOR_BASE_URL || 'http://127.0.0.1:8080']
    }))
    .on('error', function(e) { throw e; })
    .pipe(plugins.exit());
});

