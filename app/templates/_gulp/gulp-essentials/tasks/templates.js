var gulp = require('gulp' ),
  env = require('../util/env-check'),
  plugins = require('gulp-load-plugins')({lazy:false});

gulp.task('templates',function(){
  //combine all template files of the app into a js file
  var opts = {
    empty: true
  };
  return gulp.src(['!app/index.html',
    'app/**/*.html'])
    .pipe(plugins.minifyHtml(opts))
    .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
    .pipe(gulp.dest(env.outputDir + '/js'))
    .pipe(plugins.connect.reload())
    .pipe(plugins.notify({onLast: true, title:'templates', message:'done'}));
});

