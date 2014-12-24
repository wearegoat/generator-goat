var gulp = require('gulp' ),
    plugins = require('gulp-load-plugins')({lazy:false});

gulp.task('connect-close', function() {
  //firing a static server
  return plugins.connect.serverClose();
});

