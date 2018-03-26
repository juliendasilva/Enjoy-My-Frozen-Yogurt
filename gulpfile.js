const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      babel        = require("gulp-babel"),
      path         = require('path'),
      uglifyJs     = require('gulp-uglify'),
      uglifyCss    = require('gulp-uglifycss'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin     = require('gulp-imagemin'),
      concat       = require('gulp-concat'),
      concatCss    = require('gulp-concat-css'),
      favicons     = require("gulp-favicons"),
      deploy       = require('gulp-gh-pages');

const vendorJS = [
  path.join(__dirname, 'node_modules/swiper/dist/js/swiper.min.js')
];

const vendorCSS = [
  path.join(__dirname, 'node_modules/swiper/dist/css/swiper.min.css')
];

gulp.task('html', () => {
  return gulp.src(path.join(__dirname, "app/index.html"))
    .pipe(gulp.dest(path.join(__dirname, 'dist/')))
});

/* ------ Transpilation es6 to es5. ----- */
gulp.task('es6:dev', ['vendorJS'], () => {
  return gulp.src(path.join(__dirname, 'app/js/**/*.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.join(__dirname, "dist/js/")))
});

gulp.task('es6:prod', ['vendorJS'], () => {
  return gulp.src(path.join(__dirname, 'app/js/**/*.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    // minify
    .pipe(uglifyJs())
    .pipe(gulp.dest(path.join(__dirname, "dist/js/")))
});

gulp.task('vendorJS', () => {
  return gulp.src(vendorJS)
    .pipe(concat('vendor.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglifyJs())
    .pipe(gulp.dest(path.join(__dirname, "dist/js/")))
});

gulp.task("favicons", function () {
  return gulp.src(path.join(__dirname, "app/images/glace1.png")).pipe(favicons({
      appName: "Enjoy My Frozen Yogurt",
      appDescription: "An existing website, re-create from scratch to build it mobile first oriented",
      developerName: "Alexandre Cibot and Julien Da Silva",
      developerURL: "https://julien-dasilva.fr/",
      background: "#cc2355",
      url: "https://zealous-wozniak-5d9e95.netlify.com/",
      display: "standalone",
      orientation: "portrait",
      version: 1.0,
  }))
  .pipe(gulp.dest(path.join(__dirname, "dist/")));
});

gulp.task('vendorCSS', () => {
  return gulp.src(vendorCSS)
    .pipe(sass())
    .pipe(concatCss("vendor.css"))
    .pipe(autoprefixer())
    .pipe(uglifyCss())
    .pipe(gulp.dest(path.join(__dirname, "dist/css/")))
});

/* ------ Convert scss to regular css. ----- */
gulp.task('scss:dev', ['vendorCSS'], () => {
  return gulp.src(path.join(__dirname, "app/scss/style.scss"))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('scss:prod', ['vendorCSS'], () => {
  return gulp.src(path.join(__dirname, "app/scss/style.scss"))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uglifyCss())
    .pipe(gulp.dest('dist/css'))
});

/* ------ Convert tranfert app/images to dist/images ----- */
// And compress it later.
gulp.task('img:dev', () => {
  return gulp.src(path.join(__dirname, "app/images/*"))
    .pipe(gulp.dest(path.join(__dirname, 'dist/images')))
});

gulp.task('img:prod', () => {
  return gulp.src(path.join(__dirname, "app/images/*"))
    .pipe(imagemin())
    .pipe(gulp.dest(path.join(__dirname, 'dist/images')))
});

/* ------ Tranfert fonts folder ----- */
gulp.task('fonts', () => {
  return gulp.src(path.join(__dirname, "app/fonts/**/*"))
    .pipe(gulp.dest(path.join(__dirname, 'dist/fonts')))
});
/* ------ Watch news in html, scss, js files. ----- */
gulp.task('watch', ['build:dev'], () => {
  gulp.watch(['./app/index.html'], ['html']);
  gulp.watch(['./app/scss/**/*.scss'], ['scss:dev']);
  gulp.watch(['./app/js/**/*.js'], ['es6:dev']);
  gulp.watch(['./app/images/*'], ['img:dev']);
});

/* ------ Build application. ----- */
gulp.task('build:dev', ['html', 'es6:dev', 'scss:dev', 'img:dev', 'fonts'], () => {
  // Make a build
  // Transpilation es6 to es5
  // Then ... adding some minification.
});

gulp.task('build:prod', ['html', 'es6:prod', 'scss:prod', 'img:prod', 'fonts', 'favicons'], () => {
  // Make a build
  // Transpilation es6 to es5
  // Then ... adding some minification.
});

gulp.task('default', ['watch']);

gulp.task('deploy', ['build:prod'], () => {
  return gulp.src(path.join(__dirname, "/dist/**/*"))
    .pipe(deploy())
});