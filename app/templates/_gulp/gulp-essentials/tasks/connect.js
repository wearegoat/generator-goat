var gulp = require('gulp' ),
  env = require('../util/env-check'),
  gp = require('gulp-load-plugins')({lazy:false}),
  historyApiFallback = require('connect-history-api-fallback');

gulp.task('connect', function() {
  //firing a static server
  gp.connect.server({
    root: env.outputDir,
    livereload: true,
    port:'8080',
    middleware: function(connect, opt) {
      return [historyApiFallback];
    }
  });
  console.log(env.env + ' server running at http://localhost:8080/');
});

