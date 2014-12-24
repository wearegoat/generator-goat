/*
package.json and bower.json version bump task
 */

var gulp = require('gulp'),
    gp = require('gulp-load-plugins')({lazy:false});

// semver patch e.g. x.x.0 to x.x.1
gulp.task('bump-patch', function() {
   return gulp.src('./*.json')
     .pipe(gp.bump({type:'patch'}))
     .pipe(gulp.dest('./'));
});

// semver minor e.g. x.0.x to x.1.x
gulp.task('bump-minor', function() {
  return gulp.src('./*.json')
    .pipe(gp.bump({type:'minor'}))
    .pipe(gulp.dest('./'));
});

// semver major e.g. 0.x.x to 1.x.x
gulp.task('bump-major', function() {
  return gulp.src('./*.json')
    .pipe(gp.bump({type:'major'}))
    .pipe(gulp.dest('./'));
});


// semver prerelease e.g. x.x.x to x.x.x-1
gulp.task('bump-prerelease', function() {
  return gulp.src('./*.json')
    .pipe(gp.bump({type:'prerelease'}))
    .pipe(gulp.dest('./'));
});
