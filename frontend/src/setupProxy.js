const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: process.env.SPRING_SERVER_IP,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '' // URL ^/api -> 공백 변경
        }
      })
  )

  app.use(
    createProxyMiddleware('/spring', {
        target: process.env.SPRING_SERVER_IP,
        changeOrigin: true,
        pathRewrite: {
          '^/spring': '' // URL ^/api -> 공백 변경
      }
    })
)
app.use(
  createProxyMiddleware( '/scraper', {
      target: 'http://localhost:3010',
      changeOrigin: true,
  })
)
};