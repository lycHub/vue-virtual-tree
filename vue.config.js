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
    extract: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('tsx')
      .use('ts-loader')
      .tap(options => {
        options.getCustomTransformers = lazyImport;
        return options
      })
      .end();

    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options.getCustomTransformers = lazyImport;
        return options
      })
      .end();
  }
}
