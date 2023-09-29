const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff2?|jpe?g|png|gif|ico)$/,
        oneOf: [
          {
            include: path.resolve(__dirname, "../node_modules/"),
            use: "svg-inline-loader",
          },
          {
            exclude: path.resolve(__dirname, "../node_modules/"),
            use: "url-loader",
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".tsx",
      ".ts",
      ".svg",
      ".scss",
      ".sass",
      ".png",
      ".jpeg",
      ".gif",
    ],
    fallback: {
      // "fs": require.resolve('fs'),
      // "tls": require.resolve('tls'),
      // "net": require.resolve('net'),
      // "path": require.resolve('path'),
      // "zlib": require.resolve('zlib'),
      // "http": require.resolve("stream-http"),
      // "https": require.resolve("https-browserify"),
      // "stream": require.resolve('stream'),
      // "crypto": require.resolve('crypto'),
      // "crypto-browserify": require.resolve('crypto-browserify'),
      // "os": require.resolve('os'), 
      // "tty": require.resolve("tty-browserify"),
      // "url": require.resolve('url'), 
      // "assert": require.resolve('assert'), 
      // "util": require.resolve('util')
    } 
  },
};
