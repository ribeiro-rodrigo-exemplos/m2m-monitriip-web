let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let jshint = require('gulp-jshint');
let jshintStylish = require('jshint-stylish');
let csslint = require('gulp-csslint');
let babel = require('gulp-babel');
let clean = require('gulp-clean');

gulp.task('server',['copy'],() => {

  browserSync.init({
    server:{
      baseDir:'dist',
      index:'index.html',
      routes:{
        '/bower_components':'bower_components',
      }
    }
  });

  gulp.watch('src/js/**/*').on('change',event => 
      gulp.src(event.path) 
          .pipe(jshint({esversion:6})) 
          .pipe(jshint.reporter(jshintStylish))
  );

  gulp.watch('src/css/**/*').on('change',event => 
      gulp.src(event.path)
          .pipe(csslint())
          .pipe(csslint.formatter())
  );

  gulp.watch('./src/sass/**/*.scss', ['sass']);

  gulp.watch('dist/**/*').on('change',browserSync.reload);

  gulp.start('sass');

});
 
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy',['clean'],() => {
  return gulp.src('src/**/*')
              .pipe(gulp.dest('dist'));
});

gulp.task('clean',() => {
  return gulp.src('dist')
              .pipe(clean());
})
 

