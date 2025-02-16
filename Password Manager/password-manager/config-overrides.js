const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    buffer: require.resolve("buffer"),
    url: require.resolve("url"),
    zlib: require.resolve("browserify-zlib"),
    vm: false, // Ignore 'vm' module
  };

  // Add Buffer and process polyfills
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),

    // Ignore missing source maps for specific modules
    new webpack.IgnorePlugin({
      resourceRegExp: /(@walletconnect|eth-rpc-errors|@trezor)/,
      contextRegExp: /node_modules/,
    }),
  ]);

  // Exclude source-map-loader from node_modules
  config.module.rules.push({
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader",
    exclude: /node_modules/,
  });

  // Update CSS loaders
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      rule.oneOf = rule.oneOf.map(innerRule => {
        if (innerRule.test && innerRule.test.toString().includes("css")) {
          return {
            test: /\.css$/,
            use: [
              "style-loader",    // Injects CSS into DOM
              "css-loader",      // Resolves CSS imports
              "postcss-loader",  // Allows PostCSS processing
            ],
          };
        }
        return innerRule;
      });
    }
    return rule;
  });

  // Suppress source map parsing warnings
  config.ignoreWarnings = [
    {
      message: /Failed to parse source map/,
    },
  ];

  return config;
};
