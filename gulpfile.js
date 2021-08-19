const gulp = require("gulp");
const pug = require("gulp-pug");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("node-sass"));
const imagemin = require("gulp-imagemin");

const {
  VIEWS_DIR,
  SASS_DIR,
  DIST_DIR,
  IMAGES_DIR,
  JS_DIR,
} = require("./constans");

gulp.task("views", async () => {
  const indexData = await require("./index").fetchUrls();
  const pages = await require("./index").pages();

  return gulp
    .src(["./src/views/pages/*.pug", "./src/views/pages/**/*.pug"])
    .pipe(
      pug({
        pretty: false,
        data: { ...indexData, ...pages },
      })
    )
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task("images", () => {
  const base = "./src/assets/images";
  return gulp
    .src([base + "/*", base + "/**/*"])
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 70, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("./dist/assets/images"));
});

gulp.task("js", () => {
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
});

gulp.task("sass", () => {
  const base = "./src/scss";
  return gulp
    .src([base + "/*.scss", base + "/**/*.scss"])
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest(DIST_DIR + "/css"));
});

gulp.task("create-furnitures-pages", async () => {
  await require("./scripts/create-one-page-per-furniture")();
});

function compileAll() {
  return gulp.series(
    "create-furnitures-pages",
    "images",
    "js",
    "sass",
    "views"
  );
}

gulp.task("default", async () => {
  await require("./scripts/create-one-page-per-furniture")();
  gulp.task("caller", compileAll());

  const server = require("browser-sync").create();
  server.init({
    server: {
      baseDir: DIST_DIR,
    },
    ghostMode: false,
  });

  gulp.watch(VIEWS_DIR, gulp.series("views")).on("change", server.reload);
  gulp.watch(SASS_DIR, gulp.series("sass")).on("change", server.reload);
  gulp
    .watch([IMAGES_DIR, IMAGES_DIR + "*/*"], gulp.series("images"))
    .on("change", server.reload);
  gulp.watch(JS_DIR, gulp.series("js")).on("change", server.reload);
});

gulp.task("production", compileAll());
