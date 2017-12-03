const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

const prodPlugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new CopyWebpackPlugin([{
    from: __dirname + '/src/public'
  }])
];

const testRules = [
  {
    enforce: 'pre',
    test: /\.js$/,
    exclude: [
      /node_modules/,
      /\.spec\.js$/
    ],
    loader: 'istanbul-instrumenter-loader',
    query: {
      esModules: true
    }
  }
];

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: !isProd
});

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/public/index.html',
  inject: 'body',
  disable: isTest
});

const defaultOutput = {
  path: __dirname + '/dist',
  publicPath: isProd ? '/' : 'http://localhost:8080/',

  // Filename for entry points
  // Only adds hash in build mode
  filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

  // Filename for non-entry points
  // Only adds hash in build mode
  chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
};

function devTool() {
  if (isTest) {
    return 'inline-source-map';
  }
  else if (isProd) {
    return 'source-map';
  }
  return 'eval-source-map';
}

module.exports = {
  entry: isTest ? void 0 : './src/app/app.js',
  output: isTest ? {} : defaultOutput,
  devtool: devTool(),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        rules: [{
          test: /\.scss$/,
          use: extractSass.extract({
            use: [{
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
          })
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      ... isTest ? testRules : []
    ]
  },
  plugins: [
    extractSass,
    htmlPlugin,
    ... isProd ? prodPlugins : []
  ],
  devServer: {
    contentBase: './src/public',
    stats: 'minimal'
  }
};
