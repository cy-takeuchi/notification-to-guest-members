const path = require("path");

module.exports = {
  entry: {
    config: "./src/pages/config/index.tsx",
    desktop: "./src/pages/desktop/index.tsx",
  },

  output: {
    path: path.resolve(__dirname, "plugin", "js"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
