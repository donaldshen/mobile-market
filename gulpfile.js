const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const htmlmin = require('gulp-htmlmin')
// const uglify = require('gulp-uglify')
const postcss = require('gulp-postcss')
// const concat = require('gulp-concat')
const del = require('del')

// Paths to various files
const paths = {
  scripts: 'src/js/**/*',
  styles: 'src/css/*.css',
  htmls: 'src/*.html',
  assets: 'src/assets/**/*',
  lib: 'src/lib/**/*',
  dist: 'dist',
}


gulp.task('clean', (cb) => {
  del([paths.dist], cb)
})


gulp.task('htmls', () => gulp.src(paths.htmls, { base: 'src' })
  .pipe(htmlmin({
    collapseWhitespace: true,
    minifyCSS: true,
    removeComments: true,
  }))
  .pipe(gulp.dest(paths.dist)))


gulp.task('scripts', () => gulp.src(paths.scripts, { base: 'src' })
  .pipe(sourcemaps.init())
  .pipe(babel())
  // .pipe(uglify())
  // .pipe(concat('all.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist)))


gulp.task('styles', () => gulp.src(paths.styles, { base: 'src' })
  .pipe(sourcemaps.init())
  .pipe(postcss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist)))

gulp.task('assets', () => gulp.src([paths.assets, paths.lib], { base: 'src' })
  .pipe(gulp.dest(paths.dist)))

// Launches a test webserver
gulp.task('serve', () => {
  browserSync.init({
    // port: 8000,
    server: {
      baseDir: paths.dist,
    },
    browser: 'google chrome',
    files: paths.dist,
  })
})


gulp.task('build', ['htmls', 'styles', 'scripts', 'assets', 'serve'], () => {
  gulp.watch(paths.scripts, ['scripts'])
  gulp.watch([paths.styles, 'postcss.config.js'], ['styles'])
  gulp.watch(paths.htmls, ['htmls'])
  gulp.watch(paths.assets, ['assets'])
})


gulp.task('default', ['build'])
