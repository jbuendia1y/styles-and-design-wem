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

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: false,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              implementation: require("postcss"),
              postcssOptions: {
                plugins: [["autoprefixer", {}]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("node-sass"),
              sassOptions: { fiber: false },
            },
          },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
              outputPath: "assets/",
              useRelativePath: true,
            },
          },
        ],
      },
    ],
  },

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
    new HtmlWebpackPlugin({
      template: "./src/views/pages/google55eafdcb0711a918.pug",
      filename: "google55eafdcb0711a918.html",
      chunks: [],
      minify: minifyHtmlOptions,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
};
