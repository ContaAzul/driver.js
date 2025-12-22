const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');

const config = require('./config/webpack.config.demo');

const PORT = 3000;
const HOST = 'localhost';

const devServerOptions = {
  port: PORT,
  host: HOST,
  static: './dist/demo',
};

const compiler = webpack(config);
const server = new WebpackDevServer(devServerOptions, compiler);

server.start().then(() => {
  const URL = `http://${HOST}:${PORT}`;
  opn(URL);
  console.log(`Listening at ${URL}`);
});
