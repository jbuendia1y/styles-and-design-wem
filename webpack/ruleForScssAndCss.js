const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
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
};
