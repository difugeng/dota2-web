module.exports = {
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'https://api.steampowered.com/IDOTA2Match_570/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
  }
};