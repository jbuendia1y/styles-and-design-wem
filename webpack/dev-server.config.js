const { readdirSync } = require("fs");
const path = require("path");

module.exports = {
  static: {
    directory: path.join(__dirname, "dist"),
  },
  port: 3000,
  historyApiFallback: {
    rewrites: [
      { from: /^\/about/, to: "/about.html" },
      { from: /^\/404/, to: "/404.html" },
      { from: /^\/galery/, to: "/galery.html" },
      ...readdirSync(
        path.join(__dirname, "../src/views/pages/furnitures/")
      ).map((item) => {
        return {
          from: "^/" + item.replace(".pug", ""),
          to: "/" + item.replace(".pug", ".html"),
        };
      }),
      ...readdirSync(path.join(__dirname, "../src/views/pages/tags/")).map(
        (item) => {
          return {
            from: "^/" + item.replace(".pug", ""),
            to: "/" + item.replace(".pug", ".html"),
          };
        }
      ),
    ],
  },
};
