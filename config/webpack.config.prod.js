const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          keep_fnames: true,
          compress: {
            warnings: false,
          },
          sourceMap: true,
        },
      }),
    ],
  },
  entry: [
    './src/driver.scss',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, '/../dist'),
    publicPath: '/dist/',
    filename: 'driver.min.js',
    libraryTarget: 'umd',
    library: 'Driver',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          failOnWarning: false,
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.scss$/,
        loader: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: { url: false },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()], // eslint-disable-line global-require
            },
          },
          'sass-loader',
        ]),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'driver.min.css',
      allChunks: true,
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      // eslint-disable-next-line global-require
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true },
          },
        ],
      },
      canPrint: true,
    }),
  ],
  stats: {
    colors: true,
  },
  devtool: 'cheap-module-source-map',
};
