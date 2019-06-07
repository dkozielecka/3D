const path = require("path");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/components/app/app.ts",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "build")
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader"
      },
      {
        test: /\.(jsx?)$/,
        loaders: ["babel"],
        exclude: [/node_modules/]
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
  resolve: { extensions: [".js", ".jsx", ".tsx", ".ts", ".json"] },
  stats: {
    colors: true
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9000
  },
  plugins: [
    new WriteFilePlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["build/*.*"]
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "src/static"),
        to: path.join(__dirname, "build")
      }
    ])
  ]
};
