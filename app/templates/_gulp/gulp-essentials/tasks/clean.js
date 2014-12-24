var gulp = require('gulp' ),
    env = require('../util/env-check'),
    del = require('del');


gulp.task('clean', function(cb) {
    del(env.outputDir, cb);
});
