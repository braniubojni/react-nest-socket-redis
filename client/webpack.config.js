const path = require('path');

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
