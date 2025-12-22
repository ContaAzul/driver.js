const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
        },
      }),
      new CssMinimizerPlugin(),
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
    library: {
      name: 'Driver',
      type: 'umd',
      export: 'default',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')()], // eslint-disable-line global-require
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'driver.min.css',
    }),
  ],
  stats: {
    colors: true,
  },
  devtool: 'cheap-module-source-map',
};
