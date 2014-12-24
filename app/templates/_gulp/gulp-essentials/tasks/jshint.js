var gulp         = require('gulp'),
  gp = require('gulp-load-plugins')({lazy:false});

gulp.task('jshint', function() {
  return gulp.src(['./_gulpfile.js', 'app/**/*.js'])
    .pipe(gp.jshint('.jshintrc'))
    .pipe(gp.jshint.reporter('jshint-stylish'))
    .pipe(gp.notify({onLast: true, title:'jshint', message:'done'}));
});
