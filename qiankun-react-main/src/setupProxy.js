const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      target: '地址',
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    })
  )
}
