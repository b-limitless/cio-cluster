const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const port = 80;


const devConfig = {
  mode: "development",
  output: {
    publicPath: `http://localhost:${port}/`
  },
  devServer: {
    host: '0.0.0.0',
    port,
    historyApiFallback: {
      index: "/index.html",
    },
    allowedHosts: ['pasal.dev'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        auth: "auth@http://localhost:8083/remoteEntry.js", 
      },
      shared: packageJson.dependencies,
      
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
