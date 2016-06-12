var path = require('path'), //eslint-disable-line no-var
    webpack = require('webpack')

module.exports = {
  entry: [
    './assets/js/index'
  ],
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      //mangle: true,
      minimize: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'assets/js'),
        exclude: path.join(__dirname, 'node_modules/')
      },
      {
        test: /\.scss$/,
        include: /assets/,
        loaders: [
          'style',
          'css',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'url-loader'
      }
    ]
  }
}
