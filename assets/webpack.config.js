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
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
    })
  ],
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:4000',
      '/socket': {
        target: 'ws://localhost:4000',
        ws: true
      }
    }
  }
};
