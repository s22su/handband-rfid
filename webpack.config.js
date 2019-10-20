module.exports = {
  entry: './static/js/index.js',

  output: {
    filename: 'static/js/bundle.js',
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
