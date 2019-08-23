module.exports = {
  parallel: require('os').cpus().length > 1,
  productionSourceMap: false,
  publicPath: './',
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
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.15.2/axios.min.js',
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
