const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve("./dist"),
    publicPath: "/dist/",
    filename: "vue-toast.js",
    library: ["vueToasts"],
    libraryTarget: "umd"
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: "vue-style-loader", use: "css-loader!postcss-loader" }) },
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextPlugin("vue-toast.css")
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = "vue-toast.min.js",
    module.exports.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin("vue-toast.min.css")
    ];
} else {
  module.exports.devtool = '#source-map'
}
