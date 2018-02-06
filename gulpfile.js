 
 var gulp = require('gulp');
 var uglify = require('gulp-uglify');
 var rename = require('gulp-rename');
 var concat = require('gulp-concat');
 var del = require('del');
 var sass = require('gulp-sass');
 var babel = require('gulp-babel');

 gulp.task('lib', function()
 {
    gulp.src('node_modules/angular/angular.min.js').pipe(gulp.dest('web/js/lib'));
    gulp.src('node_modules/angular-route/angular-route.min.js').pipe(gulp.dest('web/js/lib'));
    gulp.src('node_modules/angular-resource/angular-resource.min.js').pipe(gulp.dest('web/js/lib'));
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('web/css/lib'));
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest('web/js/lib'));
    gulp.src('node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js').pipe(gulp.dest('web/js/lib'));
    gulp.src('node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js').pipe(gulp.dest('web/js/lib'));
 });

 gulp.task('sass', function()
 {
     gulp.src('src/NoteBundle/Resources/scss/**/*.scss')
         .pipe(sass())
         .pipe(gulp.dest('web/css'));
 });

 gulp.task('scripts',  function()
 {
    gulp.src('src/NoteBundle/Resources/js/**/*.js')
        .pipe(babel())
        .pipe(rename(function(path) {
              path.extname = ".min.js";
         }))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('web/js/'));
 });
 
 gulp.task('watch', function()
 {
	 gulp.watch('src/NoteBundle/Resources/js/**/*.js', ['scripts']);
	 gulp.watch('src/NoteBundle/Resources/scss/**/*.scss', ['sass']);
 });
 
 gulp.task('default', ['scripts', 'watch']);
