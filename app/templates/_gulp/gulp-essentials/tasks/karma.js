var gulp = require('gulp' ),
    gp = require('gulp-load-plugins')({lazy:false});

gulp.task('karma', function() {
   return gulp.src('undefined.js')
      .pipe(gp.karma({
         configFile: 'karma.conf.js',
         action: 'run'
      }));
});

