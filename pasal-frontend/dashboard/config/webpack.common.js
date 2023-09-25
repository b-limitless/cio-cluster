const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



const isProduction = false;

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
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
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     "style-loader",
      //     // Translates CSS into CommonJS
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //       },
      //     },
      //     // Compiles Sass to CSS
      //     "sass-loader",

          
      //   ],
      // },
      // {
      //   test: /\.s?css$/,
      //   oneOf: [
      //     {
      //       test: /\.module\.s?css$/,
      //       use: [
      //         MiniCssExtractPlugin.loader,
      //         {
      //           loader: "css-loader",
      //           options: { modules: true, exportOnlyLocals: false }
      //         },
      //         "sass-loader", 
             
      //       ]
      //     },
      //     {
      //       use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", ]
      //     }
      //   ]
      // },
      
      {
        test: /\.s[ac]ss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
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
        use: ['@svgr/webpack'],
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = commonConfig;
