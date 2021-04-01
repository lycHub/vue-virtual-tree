module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['./src/assets/styles/variable.scss']
    }
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-virtual-tree/' : '/'
}
