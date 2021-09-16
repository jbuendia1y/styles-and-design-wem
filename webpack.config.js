const path = require("path");
require("dotenv").config();

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fetchData = require("./scripts/fetchData");
const { readdirSync } = require("fs");

const fileProduction = () => {
  if (process.env.NODE_ENV === "production")
    return "js/[name].[contenthash].js";
  return "js/[name].js";
};

const templateData = {
  ...process.env,
  ...fetchData,
};

if (process.env.NODE_ENV !== "production")
  templateData.CANONICAL_URL = "http://localhost:3000";

const minifyHtmlOptions = {
  collapseWhitespace: true,
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
};

const furnituresPages = readdirSync(
  path.join(__dirname, "/src/views/pages/furnitures/")
).map((item) => {
  return new HtmlWebpackPlugin({
    template: "./src/views/pages/furnitures/" + item,
    data: templateData,
    filename: item.replace(".pug", ".html"),
    chunks: ["app", "furniture"],
    minify: minifyHtmlOptions,
  });
});

const tagsPages = readdirSync(
  path.join(__dirname, "/src/views/pages/tags/")
).map((item) => {
  return new HtmlWebpackPlugin({
    template: "./src/views/pages/tags/" + item,
    data: templateData,
    filename: item.replace(".pug", ".html"),
    chunks: ["app", "tag"],
    minify: minifyHtmlOptions,
  });
});

const rules = [
  require("./webpack/ruleForJavaScript"),
  require("./webpack/ruleForPug"),
  require("./webpack/ruleForScssAndCss"),
  require("./webpack/ruleForImages"),
];

module.exports = {
  entry: {
    app: {
      import: "./src/app.js",
      filename: fileProduction(),
    },
    index: {
      import: "./src/js/index.js",
      filename: fileProduction(),
    },
    galery: {
      import: "./src/js/galery.js",
      filename: fileProduction(),
    },
    furniture: {
      import: "./src/js/furniture.js",
      filename: fileProduction(),
    },
    tag: {
      import: "./src/js/tag.js",
      filename: fileProduction(),
    },
  },
  output: {
    filename:
      process.env.NODE_ENV === "production"
        ? "js/[name].[contenthash].js"
        : "js/app.js",
  },

  devServer:
    process.env.NODE_ENV !== "production"
      ? require("./webpack/dev-server.config")
      : undefined,

  module: { rules },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      data: templateData,
      chunks: ["app", "index"],
      minify: minifyHtmlOptions,
    }),
    new HtmlWebpackPlugin({
      template: "./src/views/pages/about.pug",
      data: templateData,
      filename: "about.html",
      chunks: ["app"],
      minify: minifyHtmlOptions,
    }),
    new HtmlWebpackPlugin({
      template: "./src/views/pages/galery.pug",
      data: templateData,
      filename: "galery.html",
      chunks: ["app", "galery"],
      minify: minifyHtmlOptions,
    }),
    ...furnituresPages,
    ...tagsPages,
    new HtmlWebpackPlugin({
      template: "./src/views/pages/google55eafdcb0711a918.pug",
      filename: "google55eafdcb0711a918.html",
      chunks: [],
      minify: minifyHtmlOptions,
    }),
    new HtmlWebpackPlugin({
      template: "./src/views/pages/404.pug",
      filename: "404.html",
      chunks: ["app"],
      data: templateData,
      minify: minifyHtmlOptions,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
};
