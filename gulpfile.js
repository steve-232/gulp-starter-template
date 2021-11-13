/* eslint-disable no-unused-vars */
const {
  src, dest, parallel, watch,
} = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('node-sass'));
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
const ts = require('gulp-typescript');
const rename = require('gulp-rename');

const tsProject = ts.createProject('tsconfig.json');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const sassPaths = ['src/scss/'];
let minified = '';

if (isProduction) minified = '.min';

function scss() {
  return src('src/scss/*.scss')
    .pipe(sass({
      includePaths: sassPaths,
      outputStyle: isProduction ? 'compressed' : 'expanded',
    })
      .on('error', sass.logError))
    // possible option
    // .pipe(rename(`index${minified}.css`))
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
    // possible option
    // .pipe(rename(`index${minified}.js`))
    .pipe(dest('prod/js'));
}

function typescript() {
  return src('src/ts/*.ts')
    .pipe(tsProject())
    .pipe(uglify({
      output: { beautify: !isProduction },
      compress: isProduction,
      mangle: isProduction,
    }))
    // possible option
    // .pipe(rename(`index${minified}.js`))
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
  typescript();
  watch('src/scss/*.scss', scss);
  watch('src/js/*.js', js);
  watch('src/ts/*.ts', typescript);
}

if (env === 'dev') server();

exports.server = server;
exports.scss = scss;
exports.js = js;
exports.ts = typescript;

exports.default = env === 'dev' ? watchFiles : parallel(scss, js, typescript);
