var gulp = require('gulp'),
  runSequence = require('run-sequence');

gulp.task('serve', function() {
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
    'inject',
    'connect',
    'watch');
});

