'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');
const cssmin = require('gulp-cssmin');
const livereload = require('gulp-livereload');

const env = process.env.NODE_ENV || 'development';


gulp.task('js', ()=> {
  return browserify({
    entries: ['src/app/main.js'],
    debug: env === 'development'
  })
    .transform('babelify', { presets: ["es2015"] })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload());
  }
);

gulp.task('less', ()=> {
  return gulp.src('./src/css/*.less')
    .pipe(gulpif(env === 'development', sourcemaps.init()))
    .pipe(less())
    .on('error', handleErrors)
    .pipe(concat('main.css'))
    .pipe(gulpif(env === 'development', cssmin()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});

gulp.task('html', ()=> {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('default', ['html', 'less', 'js'], (done)=> {
  livereload.listen();
  gulp.watch('./src/index.html', ['html']);
  gulp.watch('./src/css/**/*.less', ['less']);
  done();
});

function handleErrors(...args) {
  notify
    .onError({
      title: '✖ Compile Error',
      message: '<%= error.message %>'
    })
    .apply(this, args);

  console.error(args);
  this.emit('end'); // Keep gulp from hanging on this task
}