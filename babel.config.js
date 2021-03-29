module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [["import", {
    libraryName: 'ant-design-vue',
    style: 'css',   // or 'css'
  }, 'ant-design-vue']]
}
