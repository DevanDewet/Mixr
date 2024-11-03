const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'frontend', 'public'),
    filename: 'bundle.js',
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',  
              outputPath: 'assets/images', 
              publicPath: '/assets/images', 
            },
          },
        ],
      },
    ],
  },
  
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  
  devServer: {
    static: path.join(__dirname, 'frontend', 'public'),
    compress: true,
    port: 3000,
    open: true,
  },
};
