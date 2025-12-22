const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const scriptFileName = 'driver-demo.min.js';
const styleFileName = 'driver-demo.min.css';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  optimization: {
    minimizer: isProduction ? ['...', new CssMinimizerPlugin()] : [],
  },
  entry: [
    './demo/styles/demo.scss',
    './demo/scripts/demo.js',
    './src/index.js',
  ].filter(entryPoint => !!entryPoint),
  output: {
    path: path.join(__dirname, '/../dist/demo'),
    publicPath: './',
    filename: scriptFileName,
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
      filename: styleFileName,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './demo/images/',
          to: 'images',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
      favicon: 'demo/images/favicon.png',
    }),
  ],
  stats: {
    colors: true,
  },
  devtool: 'cheap-module-eval-source-map',
};
