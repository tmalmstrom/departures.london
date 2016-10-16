const webpack = require('webpack')
const { resolve } = require('path')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

const config = env => {
  const { ifProd } = getIfUtils(env)

  return {
    entry: {
      js: './js/index.js',
      vendor: ['react']
    },
    output: {
      path: resolve('./public/dist/'),
      filename: 'bundle.js',
      publicPath: 'http://localhost:8080/public/dist/'
    },
    context: resolve(__dirname, 'assets'),
    devtool: env.prod ? 'source-map' : 'eval',
    devServer: {
      contentBase: './assets',
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    bail: env.prod,
    module: {
      loaders: [
        { test: /\.scss$/, loaders: ['style', 'css', 'sass'], exclude: /node_modules|lib/ },
        { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel-loader'] },
        { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader' }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [resolve('./assets'), 'node_modules']
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify((env.prod) ? 'production' : 'development') }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
      }),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false },
        sourceMap: false
      }))
    ]),
  }
}

module.exports = config
