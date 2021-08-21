const gulp = require("gulp"),
  { DIST_DIR } = require("../constans"),
  babel = require("gulp-babel");

module.exports = () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
        comments: false,
        compact: true,
      })
    )
    .pipe(gulp.dest(DIST_DIR + "/js"));
};
