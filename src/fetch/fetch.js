import axios from 'axios'
import qs from 'qs'
import store from '@/vuex/store'

// import { Message } from 'element-ui'
import { Notification } from 'element-ui'

// import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=UTF-8'
axios.defaults.baseURL = process.env.BASE_API

// POST传参序列化
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  let userInfo = {}
  if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }
  if (userInfo && userInfo.accessToken) {
    config.headers['accessToken'] = userInfo.accessToken
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  // Message.error('错误传参')
  Notification.error({
    title: '错误',
    message: '错误传参',
    position: 'bottom-right'
  })
  // _.toast('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.data.code != '1' || res.status != 200) {
    // Message.error(res.data.error)
    Notification.error({
      title: '错误',
      message: res.data.error,
      position: 'bottom-right'
    })
    return Promise.reject(res)
  }
  return res
}, (error) => {
  if (error.response && error.response.code == '10002') {
    store.dispatch('setSignOut')
    // Message.error(error.message)
    Notification.error({
      title: '错误',
      message: error.message,
      position: 'bottom-right'
    })
  } else {
    // Message.error('网络异常')
    Notification.error({
      title: '错误',
      message: '网络异常',
      position: 'bottom-right'
    })
    // _.toast('网络异常', 'fail')
    return Promise.reject(error)
  }
})

// 数据获取封装
export default function fetch(url, method, comParams, selfParams) {
  let params = comParams
  if (params && selfParams) {
    params = Object.assign({}, comParams, selfParams)
  }
  return new Promise((resolve, reject) => {
    if (method === 'get' || !method) {
      axios.get(url, { params: params })
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}
