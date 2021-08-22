const gulp = require("gulp");

const {
  VIEWS_DIR,
  SASS_DIR,
  DIST_DIR,
  IMAGES_DIR,
  JS_DIR,
} = require("./constans");

gulp.task("views", require("./gulp/views"));

gulp.task("images", require("./gulp/images"));

gulp.task("js", require("./gulp/javascript"));

gulp.task("sass", require("./gulp/sass"));

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
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    ghostMode: false,
    notify: false,
  });

  gulp.watch(VIEWS_DIR, gulp.series("views")).on("change", server.reload);
  gulp.watch(SASS_DIR, gulp.series("sass")).on("change", server.reload);
  gulp
    .watch([IMAGES_DIR, IMAGES_DIR + "*/*"], gulp.series("images"))
    .on("change", server.reload);
  gulp.watch(JS_DIR, gulp.series("js")).on("change", server.reload);
});

gulp.task("production", compileAll());
