const gulp = require("gulp"),
  imagemin = require("gulp-imagemin");

module.exports = () => {
  const base = "./src/assets/images";
  return gulp
    .src([base + "/*", base + "/**/*"])
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 50 }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("./dist/assets/images"));
};
