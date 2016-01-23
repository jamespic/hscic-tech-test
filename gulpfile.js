var gulp = require('gulp')
var babel = require('gulp-babel')
var merge = require('merge-stream');
 
gulp.task('typecheck', function() {
  var directories = ["lib","test","bin"]
  var tasks = directories.map(dir =>
    gulp.src(`./src/${dir}/*.js`)
      .pipe(babel())
      .pipe(gulp.dest(`./${dir}`))
  )
  return merge(tasks)
})
