const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PORT = 8085;

const devConfig = {
  // optimization: {
  //   runtimeChunk: "single",
  // },
  mode: "development",
  output: {
    publicPath: `http://localhost:${PORT}/`,
  },
  devServer: {
    port: PORT,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "user",
      filename: "remoteEntry.js",
      exposes: {
        "./UserApp": "./src/bootstrap",
      },
      remotes: {
        
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
