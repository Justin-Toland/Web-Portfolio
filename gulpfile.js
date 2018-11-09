// Requires
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber');

// Scripts Task
gulp.task('scripts', function(){
  gulp.src(['js/**/*.js', '!js/**/*.min.js'])
  // gulp.src(['js/main.js', '!js/main.min.js'])//Just update the main.js file install of all js files
  .pipe(plumber())
  .pipe(rename({suffix:'.min'})) //remove if you want regular expanded JS output
  .pipe(uglify()) //remove if you want regular expanded JS output
  .pipe(gulp.dest('js'));
})

//Styles task
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix:'.min'})) //remove if you want reqular expanded css output.
    .pipe(cleanCSS({compatibility: 'ie8'})) //remove if you want reqular expanded css output.
    .pipe(gulp.dest('css'));
});

//Watch tasks
gulp.task('js:watch', function(){
  gulp.watch('js/**/*.js', ['scripts']);
});

gulp.task('sass:watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});

//Default task
gulp.task('default', ['scripts', 'js:watch', 'sass', 'sass:watch']);
