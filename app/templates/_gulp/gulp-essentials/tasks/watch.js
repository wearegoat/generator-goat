var gulp = require('gulp');

gulp.task('watch', function() {
   //watching the files
   gulp.watch('app/**/*.js', { maxListeners: 999 }, ['js']);
   gulp.watch('**/*.yml', { maxListeners: 999 }, ['yaml-data']);
   gulp.watch('app/data/*.json', { maxListeners: 999 }, ['data']);
   gulp.watch('app/**/*.scss', { maxListeners: 999 }, ['scss']);
   gulp.watch('app/styles/css-images/**/*', { maxListeners: 999 }, ['css-images']);
   gulp.watch('app/index.html', { maxListeners: 999 }, ['inject']);
   gulp.watch(['app/**/*.html','!app/index.html'], { maxListeners: 999 }, ['templates']);
});
