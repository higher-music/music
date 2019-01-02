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
  const url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1211736891&loginUin=1257126113&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=1257126113&callback=__jp0&songmid=003OUlho2HcRHC&filename=C400003OUlho2HcRHC.m4a&guid=${guid}`
  return jsonp(url, null, {
    param: 'callback'
  })
}
