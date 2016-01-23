var gulp = require('gulp')
var babel = require('gulp-babel')
//var flow = require('gulp-flowtype')
var merge = require('merge-stream');
 
gulp.task('typecheck', function() {
  var flowConfig = {
        all: false,
        weak: false,
        killFlow: false,
        beep: false,
        abort: false
    }
    
  var lib = gulp.src('./src/lib/*.js')
//    .pipe(flow(flowConfig))
    .pipe(babel())
    .pipe(gulp.dest('./lib'))
    
  var test = gulp.src('./src/test/*.js')
//    .pipe(flow(flowConfig))
    .pipe(babel())
    .pipe(gulp.dest('./test'))
  
  return merge([lib, test])
})
