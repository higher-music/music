import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: 'static/img/default.jpeg', // 图像的加载失败时 显示的error图标
  loading: 'static/img/default.jpeg', // 图像正常加载时 显示的loading图标
  attempt: 2, // 图像尝试加载 次数
  observer: true,
  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
