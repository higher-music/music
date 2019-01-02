import { commonParams } from './config'
import store from '../vuex/store'
import axios from 'axios'
import jsonp from './jsonp'

// 根据歌曲mid获取歌词
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取VKey
export function getVKey() {
  const guid = parseInt(100 * Math.random())
  store.dispatch('setGuid', guid)
  // TODO 这里把guid保存到vuex中，module为playList
  const url = `http://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&songmid=003a1tne1nSz1Y&filename=C400003a1tne1nSz1Y.m4a&guid=${guid}`
  return jsonp(url, null, null)
}
