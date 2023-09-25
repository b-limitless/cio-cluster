const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const port = 80;

const devConfig = {
  mode: "development",
  output: {
    publicPath: `http://pasal.dev:${port}/`
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
        // dashboard: "dashboard@http://localhost:8081/remoteEntry.js", 
        // product: "product@http://localhost:8082/remoteEntry.js", 
        // user: "user@http://localhost:8085/remoteEntry.js", 
        // order: "order@http://localhost:8086/remoteEntry.js",
        // payment: "payment@http://localhost:8087/remoteEntry.js",
        
      },
      shared: packageJson.dependencies,
      
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
