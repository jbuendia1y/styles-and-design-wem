require("dotenv").config();

const gulp = require("gulp"),
  { DIST_DIR } = require("../constans"),
  pug = require("gulp-pug"),
  gulpData = require("gulp-data"),
  flatten = require("gulp-flatten");

module.exports = async () => {
  const indexData = await require("../index").fetchUrls();
  const pages = await require("../index").pages();

  return gulp
    .src(["./src/views/pages/*.pug", "./src/views/pages/**/*.pug"])
    .pipe(
      pug({
        pretty: false,
        data: { ...indexData, ...pages },
        locals: gulpData(process.env),
      })
    )
    .pipe(flatten())
    .pipe(gulp.dest(DIST_DIR));
};
