const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: {
      main: './js/main.mjs',
      slider: './js/slider.mjs'
    },
    output: {
        /** название моей текущей директории плюс dist */
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
        environment: {
            arrowFunction: false
        }
    },
    module: {
        rules: [
            {
                test: /\.njs$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
          {
            test: /\.html$/i,
            loader: "html-loader"
          },
          {
            test: /\.(c|sa|sc)ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "./sass/global/vars.scss";@import "./sass/global/mixins.scss";'
              },
            },
            ],
          },
          {
            test: /\.(png|jpg|gif)$/i,
            type: "asset/resource",
            generator: {
              filename: "images/[name][ext]"
            }
          }
        ]
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerPlugin(),
        ],
   },
    plugins: [
      new HtmlWebpackPlugin({
      template: './index.html'
    }),
      new HtmlWebpackPlugin({
        filename: "top.html",
        template: './top.html'
      }),
      new HtmlWebpackPlugin({
        filename: "aboutMe.html",
        template: './aboutMe.html'
      }),
      new HtmlWebpackPlugin({
        filename: "donation.html",
        template: './donation.html'
      }),
      new MiniCssExtractPlugin()],
};
