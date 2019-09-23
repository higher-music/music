module.exports = {
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      vuetify: 'vuetify',
      'vue-router': 'VueRouter',
      'vue-lazyload': 'VueLazyload',
      vuex: 'Vuex',
      axios: 'axios'
    }
  },
  chainWebpack: config => {
    const cdn = {
      css: ['https://cdn.bootcss.com/vuetify/1.5.16/vuetify.min.css'],
      js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.15.2/axios.min.js',
        'https://cdn.bootcss.com/vue-lazyload/1.3.2/vue-lazyload.js',
        'https://cdn.bootcss.com/vuetify/1.5.16/vuetify.min.js'
      ]
    };
    // html中添加cdn
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
};
