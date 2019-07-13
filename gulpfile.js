const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const { src, dest, watch } = require('gulp');


function css() {
  return src('./dev/css/**/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(dest('./static/css/custom')); 
}

function javascript() {
  return src('./dev/js/**/*.js')
      .pipe(uglify())
      .pipe(dest('./static/js/custom'));
}

exports.default = function() {
  watch('./dev/css/**/*.scss', { ignoreInitial: false }, css);
  watch('./dev/js/**/*.js', { ignoreInitial: false }, javascript);
}