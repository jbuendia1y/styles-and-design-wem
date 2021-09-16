module.exports = {
  test: /\.pug$/,
  use: [
    {
      loader: "pug-loader",
      options: {
        pretty: false,
      },
    },
  ],
};
