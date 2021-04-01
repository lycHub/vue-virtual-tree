module.exports = {
  productionSourceMap: false,
  css: {
    extract: false,
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
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-virtual-tree' : '/'
}
