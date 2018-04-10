let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let jshint = require('gulp-jshint');
let jshintStylish = require('jshint-stylish');
let csslint = require('gulp-csslint');
let babel = require('gulp-babel');
let clean = require('gulp-clean');
let del = require('del');
let path = require('path');
let sourcemaps = require('gulp-sourcemaps');
let usemin = require('gulp-usemin');
let cssmin = require('gulp-cssmin');
let uglify = require('gulp-uglify');
let run = require('gulp-run');

function transpile(origin,dest){
  return gulp.src(origin)
              .pipe(sourcemaps.init({loadMaps:true}))
              .pipe(babel({
                presets:['es2015']
              }))
              .pipe(sourcemaps.write('.'))
              .pipe(gulp.dest(dest));
}

gulp.task('default',['transpile'],() => {
  gulp.start('concat-min');
  gulp.start('sass');
  gulp.start('bower-task');
});

gulp.task('bower-task',() => {
      run('bower cache clean --allow-root').exec('', () => {
        run('bower install --allow-root').exec('',() => gulp.src('bower_components/**/*')
          .pipe(gulp.dest('dist/bower_components')));
      });

});

gulp.task('server',['transpile'],() => {

  browserSync.init({
    server:{
      baseDir:'dist',
      index:'index.html',
      routes:{
        '/bower_components':'bower_components',
      }
    }
  });

  gulp.watch('src/js/**/*').on('change',event =>{
    gulp.src(event.path) 
        .pipe(jshint({esversion:6})) 
        .pipe(jshint.reporter(jshintStylish))

        const fileUpdated = event.path.replace('src','dist');

        del([fileUpdated])
          .then(() => transpile(event.path,path.dirname(fileUpdated)));
  });

  gulp.watch('src/css/**/*').on('change',event => 
      gulp.src(event.path)
          .pipe(csslint())
          .pipe(csslint.formatter())
  );

  gulp.watch('./src/sass/**/*.scss', ['sass']);
  
  gulp.start('sass');

  //gulp.watch('src/**/*').on('change','concat-min');

  // gulp.watch('./src/views/**/*').on('change', event => {
  //   console.log("change detected");
  // });

 // gulp.watch('./src/views/**/*').on('change', 'copy');

  gulp.watch('./src/views/**/*').on('change', 'concat-min');

  gulp.watch('dist/**/*').on('change',browserSync.reload);

  

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
});

gulp.task('clean-js-dist',['copy'],() => {
  return gulp.src('dist/js')
              .pipe(clean()); 

});

gulp.task('transpile',['clean-js-dist'],() => {
  return transpile('src/js/**/*','dist/js');
});

gulp.task('concat-min',() => {
  gulp.src('dist/*.html')
        .pipe(usemin({
          'js':[uglify],
          'css':[cssmin]
        }))
        .pipe(gulp.dest('dist'));
});
