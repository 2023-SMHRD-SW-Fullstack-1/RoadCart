const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://172.30.1.39:8089',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '' // URL ^/api -> 공백 변경
        }
      })
  ),

  app.use(
    createProxyMiddleware('/spring', {
        target: 'http://localhost:8089',
        changeOrigin: true,
        pathRewrite: {
          '^/spring': '' // URL ^/api -> 공백 변경
      }
    })
),
app.use(
  createProxyMiddleware( '/scraper', {
      target: 'http://localhost:3010',
      changeOrigin: true,
  })
)
};