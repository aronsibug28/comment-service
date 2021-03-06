const path = require('path');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');



const config = {
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'React Example Storybook Build',
      warningSound: true,
      failureSound: true,
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          },
          { loader: 'source-map-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|svg|webp|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ],
  },
  // devServer = {
  //     compress: true,
  //     hot: true,
  //     contentBase: path.resolve(__dirname, '..'),
  //     publicPath: '/',
  //     historyApiFallback: true,
  //     host: '0.0.0.0',
  //     port: 6006,
  //     proxy: { // proxy URLs to backend development server
  //         '/clspa-gateway': 'http://localhost:8080',
  //     },
  // }
};

module.exports = config