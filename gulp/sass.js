const gulp = require("gulp"),
  { DIST_DIR } = require("../constans"),
  sass = require("gulp-sass")(require("node-sass")),
  cleanCSS = require("gulp-clean-css"),
  purge = require("gulp-css-purge");

module.exports = () => {
  const base = "./src/scss";
  return gulp
    .src([base + "/*.scss", base + "/**/*.scss"])
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(purge({ verbose: false, shorten: true }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(DIST_DIR + "/css"));
};
