const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/components/app/app.js",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "build")
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9000
  }
};
