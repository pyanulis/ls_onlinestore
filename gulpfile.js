var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    jade = require('gulp-jade'),
    plumber = require("gulp-plumber"),
    compass = require('gulp-compass');

var jadePath = './src/jade/*.jade';

gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src(jadePath)
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: '\t'
        }))
        .pipe(gulp.dest('./app/'))
});

gulp.task("server", function(){
   browserSync({
      port: 9000,
       server:{
           baseDir: "app"
       }
   });
});

gulp.task('compass', function() {
  gulp.src('./src/scss/main.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: './app/css',
      sass: './src/scss'
    }))
});

gulp.task("watch", function(){
   gulp.watch([
       "app/*.html",
       "app/js/**/*.js",
       "app/css/**/*.*",
       "app/html/**/*.*"
   ]).on("change", browserSync.reload);

    gulp.watch(jadePath, ["jade"]);
    gulp.watch("src/scss/**/*.scss", ["compass"]);
});

gulp.task("default", ["server", "watch"]);