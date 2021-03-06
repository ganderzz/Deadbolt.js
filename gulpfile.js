"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

var DEST = "dist/";

gulp.task("build-js", function() {
  return gulp.src("src/deadbolt.js")
		     .pipe(gulp.dest(DEST))
		     .pipe(uglify())
		     .pipe(rename({ extname: ".min.js" }))
		     .pipe(gulp.dest(DEST));
});
