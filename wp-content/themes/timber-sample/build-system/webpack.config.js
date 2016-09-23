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
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: path.join(__dirname, "es6"),
                query: {
                    presets: "es2015",
                },
            },
            {
               test: /node_modules\/flickity/, loader: 'imports?define=>undefined'
            }
        ],
    },
    stats: {
        colors: true,
    },
    devtool: "source-map",
};
