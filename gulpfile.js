var gulp = require('gulp');
var babel = require('gulp-babel');
var flow = require('gulp-flowtype');
 
gulp.task('typecheck', function() {
  return gulp.src('./src/**/*.js')
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './declarations',
        killFlow: false,
        beep: false,
        abort: false
    }))
    .pipe(babel())
    .pipe(gulp.dest('.'));
});
