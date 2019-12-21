const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: {
      login:        './dev/js/login/index.js',
      get_started:  './dev/js/get_started/index.js',
      space:        './dev/js/space/index.js',
      dashboard:    './dev/js/dashboard/index.js',
      feed:         './dev/js/dashboard/feed/index.js',
      budget:       './dev/js/dashboard/budget/index.js',
      badge:        './dev/js/dashboard/badge/index.js',
      employee:     './dev/js/dashboard/employee/index.js',
      profile:      './dev/js/dashboard/profile/index.js'
  },
  output: {
    filename: "./js/[name].[hash].min.js",
    chunkFilename: "./js/[id].[chunkhash].min.js",
    path: path.resolve(__dirname, 'static'),
  },
  watch: true,
  mode: 'development',
  module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader",},
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
              ]
            }
        ]
    },
  plugins: [
      new MiniCssExtractPlugin({
          filename: "./css/[name].[hash].min.css",
          chunkFilename: "./css/[id].[chunkhash].min.css",
      }),
      new AssetsPlugin({useCompilerPath: true}),
      new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['js/*.min.js', 'css/*.min.css'],
      }),
      // require('autoprefixer'),
      // require('cssnano'),
  ]
};
