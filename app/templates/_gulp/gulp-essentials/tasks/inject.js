//noinspection Annotator,Annotator,Annotator,Annotator
var gulp = require('gulp'),
  env = require('../util/env-check'),
  bower = require('../../bower.json'),
  gp = require('gulp-load-plugins')({lazy:false});


gulp.task('inject', function() {
  //noinspection ReservedWordAsName
  gulp
    .src('./app/index.html')
    .pipe(gp.inject(gulp.src(env.outputDir + '/**/*.css',
      {read:false}), {
      ignorePath: env.outputDir + '/',
      addRootSlash: false
    }))
    .pipe(gp.inject(gulp.src(env.outputDir + '/bower_components/**/*.js')
      .pipe(gp.order(['**/moment.js', '**/angular.js', '*.js'])), {
      ignorePath: env.outputDir + '/',
      addRootSlash: false,
      starttag: '<!-- inject:vendorjs -->'
    }))
    .pipe(gp.if( env.env === 'production', gp.googleCdn(bower)))

    // if overrides needed
    //.pipe(gp.if( env.env === 'production', gp.cdnizer([
    //  'cdnjs:angular-moment',
    //  'cdnjs:angular-ui-router',
    //  {
    //    file: '**/moment/*.js',
    //    package: 'moment',
    //    cdn: 'cdnjs:moment.js:${ filenameMin }'
    //  },
    //  {
    //    file: '**/lodash/**/*.js',
    //    package: 'lodash',
    //    cdn: 'cdnjs:lodash.js:${ filenameMin }'
    //  }
    //])))

    .pipe(gp.inject(gulp.src(env.outputDir + '/js/templates.js',
      {read:false}), {
      ignorePath: env.outputDir + '/',
      addRootSlash: false,
      starttag: '<!-- inject:templates -->'
    }))
    .pipe(gp.inject(gulp.src([
      env.outputDir + '/scripts/**/*.js'
    ]).pipe(gp.angularFilesort()), {
      ignorePath: env.outputDir + '/',
      addRootSlash: false,
      starttag: '<!-- inject:js -->'
    }))
    .pipe(gulp.dest(env.outputDir))
    .pipe(gp.connect.reload())
    .pipe(gp.notify({onLast: true, title:'inject', message:'done'}));
});

