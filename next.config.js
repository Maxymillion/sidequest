const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  swcMinify: true,
  experimental: { appDir: true },
})
