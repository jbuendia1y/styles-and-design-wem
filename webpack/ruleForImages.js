module.exports = {
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
};
