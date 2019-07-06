const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '../../public/oa/oa.js'
  }
};
