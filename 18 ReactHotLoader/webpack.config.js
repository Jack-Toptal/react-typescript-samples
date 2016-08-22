var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

module.exports = {
  debug: true,
  context: path.join(basePath, "src"),
  resolve: {
      // .js is required for react imports.
      // .tsx is for our app entry point.
      // .ts is optional, in case you will be importing any regular ts files.
      extensions: ['', '.js', '.ts', '.tsx']
  },

  // Toake into account: remove hot loading entry points in production
  entry: [
    'webpack-hot-middleware/client',
    './index.tsx',
    './css/site.css',
    '../node_modules/toastr/build/toastr.css',
    '../node_modules/bootstrap/dist/css/bootstrap.css'
  ],

  output: {
    publicPath: 'http://localhost:9090/',
    path: path.join(basePath, "dist"),
    filename: 'bundle.js'
  },


  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',

  module: {
		loaders: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loaders: ['babel','ts-loader']
      },
      //Note: Doesn't exclude node_modules to load bootstrap
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader')
      },
      //Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      //Using here url-loader and file-loader
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      {
        test: /\.(gif|jpg|png)$/,
        include: path.join(basePath, "src/images"),
        loader: 'url-loader?limit=100000'
      }
		]
	},

  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html' //Name of template in ./src
    }),
    //Generate bundle.css => https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin('bundle.css'),
    //Expose jquery used by bootstrap
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}
