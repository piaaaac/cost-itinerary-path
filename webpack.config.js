var webpack = require("webpack")
var path = require("path")
module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, "./build/"),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader?retainLines=true',
      exclude: /node-modules/,
      query: {
        presets: [
          'es2015',
          'react'
        ]
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader', {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }]
  }
}