var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

gulp.task('default', ['sass', 'scripts']);

gulp.task('sass', function(){
    return gulp.src('./assets/css/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
    .pipe(concat('style.min.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('scripts', function(){
    return gulp.src('./assets/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
})

gulp.task('watch', function(){
    gulp.watch('./assets/css/sass/**/*.scss',['sass']);
    gulp.watch('./assets/js/**/*.js',['scripts']);
})