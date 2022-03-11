// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
// const postcssNormalize = require('postcss-normalize');
// const autoprefixer = require('autoprefixer');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const PostCssFlexBugFixes = require('postcss-flexbugs-fixes');
// const paths = require('razzle/config/paths');
// const postcssLoadConfig = require('postcss-load-config');

//
// const sassRegex = /\.(scss|sass)$/;
// const sassModuleRegex = /\.module\.(scss|sass)$/;
// const getStyleLoaders = (cssOptions, preProcessor) => {
//   const loaders = [
//     {
//       loader: MiniCssExtractPlugin.loader
//     },
//     {
//       loader: require.resolve('css-loader'),
//       options: cssOptions,
//     },
//     {
//       loader: require.resolve('postcss-loader'),
//       options: {
//         ident: 'postcss',
//         plugins: () => [
//           require('postcss-flexbugs-fixes'),
//           require('postcss-preset-env')({
//             autoprefixer: {
//               flexbox: 'no-2009',
//             },
//             stage: 3,
//           }),
//           postcssNormalize(),
//         ],
//         sourceMap: false,
//       },
//     },
//   ].filter(Boolean);
//   if (preProcessor) {
//     loaders.push({
//       loader: require.resolve(preProcessor),
//       options: {
//         sourceMap: false,
//       },
//     });
//   }
//   return loaders;
// };
//
// module.exports = {
//   modify: (config, { target, dev }, webpack) => {
//     delete config.externals;
//     config.plugins.push(new MiniCssExtractPlugin({
//       filename: 'static/css/bundle.[contenthash:8].css',
//       chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
//       allChunks: true,
//     }));
//
//     config.module.rules.push(
//       {
//         test: sassRegex,
//         exclude: sassModuleRegex,
//         use: getStyleLoaders(
//           {
//             importLoaders: 1,
//             sourceMap: false,
//           },
//           'sass-loader'
//         ),
//         sideEffects: true,
//       },
//       {
//         test: sassModuleRegex,
//         use: getStyleLoaders(
//           {
//             importLoaders: 1,
//             sourceMap: false,
//             modules: true,
//             getLocalIdent: getCSSModuleLocalIdent,
//           },
//           'sass-loader'
//         ),
//       }
//     )
//     return config;
//   }
// };

// const hasPostCssConfig = () => {
//   try {
//     return !!postcssLoadConfig.sync();
//   } catch (_error) {
//     return false;
//   }
// };
//
// module.exports = {
//   modify: (config, { target, dev }, webpack) => {
//     delete config.externals;
//
//     const isServer = target !== 'web';
//     const constantEnv = dev ? 'dev' : 'prod';
//
//     // const config = Object.assign({}, opts.webpackConfig);
//
//     const defaultOptions = {
//       postcss: {
//         dev: {
//           sourceMap: true,
//           ident: 'postcss',
//         },
//         prod: {
//           sourceMap: false,
//           ident: 'postcss',
//         },
//         plugins: [
//           PostCssFlexBugFixes,
//           autoprefixer({
//             browsers: [
//               '>1%',
//               'last 4 versions',
//               'Firefox ESR',
//               'not ie < 9',
//             ],
//             flexbox: 'no-2009',
//           }),
//         ],
//       },
//       sass: {
//         dev: {
//           sassOptions: {
//             sourceMap: true,
//             includePaths: [paths.appNodeModules],
//           },
//         },
//         prod: {
//           sassOptions: {
//             // XXX Source maps are required for the resolve-url-loader to properly
//             // function. Disable them in later stages if you do not want source maps.
//             sourceMap: true,
//             sourceMapContents: false,
//             includePaths: [paths.appNodeModules],
//           },
//         },
//       },
//       css: {
//         dev: {
//           sourceMap: true,
//           importLoaders: 1,
//           modules: {
//             auto: true,
//             localIdentName: '[name]__[local]___[hash:base64:5]',
//           },
//         },
//         prod: {
//           sourceMap: false,
//           importLoaders: 1,
//           modules: {
//             auto: true,
//             localIdentName: '[name]__[local]___[hash:base64:5]',
//           },
//         },
//       },
//       style: {},
//       resolveUrl: {
//         dev: {},
//         prod: {},
//       },
//     };
//
//     const options = Object.assign(
//       {},
//       defaultOptions,
//       // opts.options.pluginOptions
//     );
//
//     const styleLoader = {
//       loader: require.resolve('style-loader'),
//       options: options.style,
//     };
//
//     const cssLoader = {
//       loader: require.resolve('css-loader'),
//       options: options.css[constantEnv],
//     };
//
//     const resolveUrlLoader = {
//       loader: require.resolve('resolve-url-loader'),
//       options: options.resolveUrl[constantEnv],
//     };
//
//     const postCssLoader = {
//       loader: require.resolve('postcss-loader'),
//       options: hasPostCssConfig()
//         ? undefined
//         : Object.assign({}, options.postcss[constantEnv], {
//           plugins: () => options.postcss.plugins,
//         }),
//     };
//
//     const sassLoader = {
//       loader: require.resolve('sass-loader'),
//       options: options.sass[constantEnv],
//     };
//
//
//     // console.log(options.css, 'options.css')
//     config.module.rules = [
//       ...config.module.rules,
//       {
//         test: /\.(sa|sc)ss$/,
//         use: isServer
//           ? [
//             {
//               loader: require.resolve('css-loader'),
//               options: Object.assign({}, options.css[constantEnv], {
//                 onlyLocals: true,
//               }),
//             },
//             resolveUrlLoader,
//             postCssLoader,
//             sassLoader,
//           ]
//           : [
//             dev ? styleLoader : MiniCssExtractPlugin.loader,
//             cssLoader,
//             postCssLoader,
//             resolveUrlLoader,
//             sassLoader,
//           ],
//       },
//     ];
//
//     return config;
//   },
// };

module.exports = {
  plugins: ['scss'],
  modify: (config) => {
    delete config.externals;

    return config;
  },
};
