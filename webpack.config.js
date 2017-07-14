var webpack = require("webpack")
var path = require("path")

// NO WEBPACK-DEV-SERVER
module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { 
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
        test   : /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }, {
        test   : /\.scss$/,
        loaders: ['style-loader', 'css-loader', { loader: 'sass-loader', options: { sourceMap: true } }]
      },{
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }, {
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}), 
    new webpack.optimize.UglifyJsPlugin()
  ]
}
