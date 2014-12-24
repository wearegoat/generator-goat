/*
Build task
 */
var gulp = require('gulp'),
  runSequence = require('run-sequence');

/*
Run build sequence
 */
gulp.task('build', function() {
  runSequence(
    'clean',
    'resources',
    'yaml-data',
    [
      'scss',
      'vendor',
      'js',
      'templates'
    ],
    'inject'
  );
});
