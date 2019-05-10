const path = require('path');

module.exports = {
  mode: process && process.ENV || "production",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pfft.js',
    library: 'pfft-jss',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      }
    ],
  }
};