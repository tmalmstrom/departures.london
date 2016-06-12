var path = require('path') //eslint-disable-line no-var

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './assets/js/index.js')
  ],
  output: {
    path: './public/dist/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/public/dist/'
  },
  devtool: 'eval',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
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
