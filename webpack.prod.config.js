var path = require('path'), //eslint-disable-line no-var
    webpack = require('webpack')

module.exports = {
  devtool: null,
  entry: [
    './assets/js/index'
  ],
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
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
        loader: 'file-loader'
      }
    ]
  }
}
