import gulp from 'gulp';
import util from 'gulp-util';
import babel from "gulp-babel";
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';

const src = 'src/';
const sassPaths = [];
const env = process.env.NODE_ENV;

gulp.task('sass', () => {
  return gulp.src(`${src}sass/main.scss`)
    .pipe(sass({
      includePaths: sassPaths,
      outputStyle: env === 'production' ? 'compressed' : 'expanded'
    })
    .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('babel', () => {
  return gulp.src([
    `${src}js/es6.js`
  ])
  .pipe(babel({presets: ['env']}))
  .pipe(rename('custom.js'))
  .pipe(gulp.dest(src + 'js'));
});

gulp.task('concat', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    `${src}js/custom.js`
  ])
  .pipe(concat('main.js'))
  .pipe(env === 'production' ? uglify() : util.noop())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['sass', 'concat'], () => {
  if (env === 'dev') {
    gulp.watch(`${src}sass/*.scss`, ['sass']);
    gulp.watch(`${src}js/es6.js`, ['babel']);
    gulp.watch(`${src}js/custom.js`, ['concat']);
  }
});
