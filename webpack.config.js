const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
      login: './dev/js/login/index.js',
      getStarted: './dev/js/getStarted/index.js',
      space: './dev/js/space/index.js',
      dashboard: './dev/js/dashboard/index.js',
      budget: './dev/js/dashboard/budget/index.js'
  },
  output: {
    filename: '../js/[name].js',
    path: path.resolve(__dirname, 'static', 'css')
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
          filename: "[name].css"
      }),
      // require('autoprefixer'),
      // require('cssnano'),
  ]
};