const tsImportPluginFactory = require('ts-import-plugin');
const lazyImport = () => ({
  before: [tsImportPluginFactory({
    libraryName: 'ant-design-vue',
    style: 'css'
  })]
});

module.exports = {
  productionSourceMap: false,
  css: {
    extract: false
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['./src/assets/styles/variable.scss']
    }
  },
  parallel: false,
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-virtual-tree' : '/',
  chainWebpack(config) {
    config.module
      .rule('tsx')
      .use('ts-loader')
      .tap(options => {
        options.getCustomTransformers = lazyImport;
        // options.happyPackMode = false;
        return options
      })
      .end();

    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options.getCustomTransformers = lazyImport;
        // options.happyPackMode = false;
        return options
      })
      .end();
  }
}
