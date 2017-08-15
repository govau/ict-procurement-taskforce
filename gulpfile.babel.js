'use strict';

import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import browser  from 'browser-sync';
import gulp     from 'gulp';
import yaml     from 'js-yaml';
import fs       from 'fs';
import del      from 'del';


// Load all Gulp plugins into one variable
const $ = plugins();

// Load settings from settings.yml
const { NAME, PORT, CLEAN, COMPATIBILITY, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Build the site, run the server, and watch for file changes
gulp.task('default', gulp.series(clean, copyObjects, html, js, sass, [server, watch]));

// Clean out the folders specified by the CLEAN constant.

function clean() {
  return del(
    CLEAN
  );
}

// Move scripts from source into destination.
// If anything else needs to happen to the JS, do it here.

function js() {
  return gulp.src('.' + PATHS.js + '**/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(browser.reload({ stream: true }));
}

// Compile Sass into CSS
function sass() {
  return gulp.src('.' + PATHS.sass + '**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass,
      noCache: true
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browser.reload({ stream: true }));
}

function jsWatch(done) {
  browser.reload();
  done();
}

function htmlWatch(done) {
  browser.reload();
  done();
}

function html() {
  return gulp.src('.' + PATHS.html + '**/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(browser.reload({ stream: true }));
}

function copyObjects() {
  return gulp.src('./src/assets/**/*.*')
    .pipe(gulp.dest('./dist/assets/'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: {
      baseDir: "./dist/"
    }
  });
  done();
}

// Watch for changes to Sass, HTML and .js.
function watch() {
  gulp.watch('./src/sass/**/*.scss', sass);
  gulp.watch('./src/html/**/*.html', gulp.series(html, htmlWatch));
  gulp.watch('./src/scripts/**/*.js', gulp.series(js, jsWatch));
}
