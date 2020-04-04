const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './js/index.jsx',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        resolve: {
          extensions: ['.js', '.jsx']
        },
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
};
