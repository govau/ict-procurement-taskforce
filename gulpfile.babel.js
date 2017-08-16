'use strict';

import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import browser  from 'browser-sync';
import gulp     from 'gulp';
import yaml     from 'js-yaml';
import fs       from 'fs';
import del      from 'del';
import panini   from 'panini';


// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { NAME, PORT, CLEAN, COMPATIBILITY, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Build the 'dist' folder.
gulp.task('build',
  gulp.series(clean, gulp.parallel(pages, sass, javascript, copy)));

// Build the site, run the server and watch for changes.
gulp.task('default',
  gulp.series('build', server, watch));

// Clean out the folders specified by the CLEAN constant.

function clean() {
  return del(
    CLEAN
  );
}

// Copy page templates into finished HTML files.
function pages() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: './src/pages/',
      layouts: './src/layouts/',
      partials: './src/partials/',
      helpers: './src/helpers/',
      data: './src/data',
    }))
    .pipe(gulp.dest('./dist/'))
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

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src('./src/scripts/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('./dist/js/'));
}

// Copy static assets etc. over to 'dist'.
function copy() {
  return gulp.src('./src/assets/**/*.*')
    .pipe(gulp.dest('./dist/assets/'));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
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
  gulp.watch('./src/assets/**/*.*', copy);
  gulp.watch('./src/sass/**/*.scss', sass);
  gulp.watch('./src/**/*.html')
    .on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('./src/scripts/**/*.js', gulp.series(javascript, browser.reload));
}
