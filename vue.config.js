const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve(dir) {
  return path.join(__dirname, dir)
}

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const productionPath = '/yourProjectPath/'
module.exports = {
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  publicPath: IS_PROD ? productionPath : '/',
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vuetify': 'vuetify',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios'
    }
  },
  chainWebpack: config => {
    const cdn = {
      // css: ['//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css'],
      js: [
        '//cdn.bootcss.com/vue/2.6.10/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        '//cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
        '//cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        '//cdn.bootcss.com/axios/0.15.2/axios.min.js',
        '//cdn.bootcss.com/vuetify/1.5.16/vuetify.min.js'
      ]
    };
    // html中添加cdn
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
};
