/**
 * @file
 * Gulpfile for fortytwo.
 */

var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
var del          = require('del');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var cp           = require('child_process');

/**
 * @task browser-sync
 * Lint sass, abort calling task on error
 */
gulp.task('browser-sync', function() {
  browserSync.init({
      proxy: "hm-public.test"
  });
});

/**
 * @task sass-lint
 * Lint sass, abort calling task on error
 */
gulp.task('sass-lint', function () {
  return gulp.src('static/sass/**/*.s+(a|c)ss')
  .pipe($.sassLint({configFile: '.sass-lint.yml'}))
  .pipe($.sassLint.format())
  .pipe($.sassLint.failOnError());
});

gulp.task('sass-compile', ['sass-lint'], function () {
  // postCss plugins and processes
  var pcPlug = {
    autoprefixer: require('autoprefixer'),
    mqpacker: require('css-mqpacker')
  };
  var pcProcess = [
    pcPlug.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']
    }),
    pcPlug.mqpacker()
  ];

  return gulp.src('static/sass/**/*.s+(a|c)ss') // Gets all files ending
  .pipe($.sass())
  .on('error', function (err) {
    console.log(err);
    this.emit('end');
  })
  .pipe($.sourcemaps.init())
  .pipe($.postcss(pcProcess))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest('static/css'))
  .pipe(browserSync.reload({stream:true}))
});

/**
 * @task clean
 * Clean the dist folder.
 */
gulp.task('clean', function () {
  return del(['static/css/*']);
});

/**
 * @task clearcache
 * Clear all caches
 */
gulp.task('clearcache', function(done) {
  return cp.spawn('drush', ['cache-rebuild'], {stdio: 'inherit'})
  .on('close', done);
});

/**
 * @task reload
 * Refresh the page after clearing cache
 */
gulp.task('reload', function () {
  browserSync.reload();
});

/**
 * @task watch
 * Watch files and do stuff.
 */
gulp.task('watch', ['clean', 'sass-compile','browser-sync'], function () {
  gulp.watch('static/sass/**/*.+(scss|sass)', ['sass-compile','reload']);
  gulp.watch(['templates/**/*.twig', 'partials/**/*.twig','**/*.yml'], ['clearcache','reload']);
});

/**
 * @task default
 * Watch files and do stuff.
 */
gulp.task('default', ['watch']);

