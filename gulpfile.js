let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let jshint = require('gulp-jshint');
let jshintStylish = require('jshint-stylish');
let csslint = require('gulp-csslint');

gulp.task('server',() => {

  browserSync.init({
    server:{
      baseDir:'src',
      routes:{
        '/bower_components':'bower_components'
      }
    }
  });

  gulp.watch('src/js/**/*').on('change',event => 
      gulp.src(event.path) 
          .pipe(jshint()) 
          .pipe(jshint.reporter(jshintStylish))
  );

  gulp.watch('src/css/**/*').on('change',event => 
      gulp.src(event.path)
          .pipe(csslint())
          .pipe(csslint.formatter())
  );

  gulp.watch('./src/sass/**/*.scss', ['sass']);

  gulp.watch('src/**/*').on('change',browserSync.reload);

});
 
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});
 

