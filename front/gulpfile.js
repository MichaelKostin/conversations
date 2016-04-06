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
const env = process.env.NODE_ENV || 'development';
const cssmin = require('gulp-cssmin');

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
});

gulp.task('less', function() {
    return gulp.src('./src/css/*.less')
        .pipe(gulpif(env === 'development', sourcemaps.init()))
        .pipe(less())
        .on('error', handleErrors)
        .pipe(concat('main.css'))
        .pipe(gulpif(env === 'development', cssmin()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'))
});

gulp.task('default', function(done) {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/css/**/*.less', ['less']);
    done();
});




function handleErrors() {
    const args = Array.prototype.slice.call(arguments);
    notify
        .onError({
            title: '✖ Compile Error',
            message: '<%= error.message %>'
        })
        .apply(this, args);

    console.error(args);
    this.emit('end'); // Keep gulp from hanging on this task
}