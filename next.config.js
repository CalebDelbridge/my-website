const withPlugins = require("next-compose-plugins")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = withPlugins([], {
  distDir: "build",
  target: "serverless",
  webpack: (config) => {
    config.optimization.minimize = true
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ]
    return config
  },
})
