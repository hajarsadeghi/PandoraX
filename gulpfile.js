const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const { src, dest, watch } = require('gulp');


function css() {
  return src('static/css/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(dest('dist/css')); 
}

function javascript() {
  return src('static/js/*.js')
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(dest('dist/js '));
}

exports.default = function() {
  watch('static/css/*.scss', { ignoreInitial: false }, css);
  watch('static/js/*.js', { ignoreInitial: false }, javascript);
}