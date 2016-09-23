var path = require("path");
var webpack = require( 'webpack' );
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: "./es6/main.js",
    output: {
        path: path.join(__dirname, "../assets/dist" ),
        filename: "bundle.js",
    },
    watch: true,
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new CompressionPlugin({
          asset: 'app-min.gz',
          algorithm: 'gzip',
          threshold: 10240,
          minRatio: 0.8
      })
    ],
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: path.join(__dirname, "es6"),
                query: {
                    presets: "es2015",
                },
            },
        ],
    },
    stats: {
        colors: true,
    },
    devtool: "source-map",
};
