const common = require('./webpack.common.js');

const path = require('path');
const { merge } = require('webpack-merge');
const WebpackUsersript = require('webpack-userscript');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'ArcaRefresher.user.js',
  },
  plugins: [
    new WebpackUsersript({
      headers: path.join(__dirname, './src/meta.json'),
    }),
  ],
});
