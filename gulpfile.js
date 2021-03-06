const {
  src, dest, parallel, watch,
} = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const sassPaths = ['src/scss/'];

function scss() {
  return src('src/scss/*.scss')
    .pipe(sass({
      includePaths: sassPaths,
      outputStyle: isProduction ? 'compressed' : 'expanded',
    })
      .on('error', sass.logError))
    .pipe(dest('prod/css'));
}

function js() {
  return src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/plugin-proposal-class-properties'],
    }))
    .pipe(uglify({
      output: { beautify: !isProduction },
      compress: isProduction,
      mangle: isProduction,
    }))
    .pipe(dest('prod/js'));
}

function server() {
  return src('prod')
    .pipe(webserver({
      open: true,
      livereload: true,
    }));
}

function watchFiles() {
  scss();
  js();
  watch('src/scss/*.scss', scss);
  watch('src/js/*.js', js);
}

if (!isProduction) server();

exports.server = server;
exports.scss = scss;
exports.js = js;
exports.default = env === 'dev' ? watchFiles : parallel(scss, js);
