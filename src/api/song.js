import { options2 } from './config'
import store from '../vuex/store'
import { jsonp2 } from './jsonp'

// 根据歌曲mid获取歌词
export function getLyric(mid) {
  return null
}

// 获取VKey
export function getVKey() {
  const guid = parseInt(100 * Math.random())
  store.dispatch('setGuid', guid)
  const url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=0&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=003a1tne1nSz1Y&filename=C400003a1tne1nSz1Y.m4a&guid=${guid}`
  return jsonp2(url, options2)
}

// 获取TOP所有数据
export function getNewSong() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom6930851858851761&g_tk=1288021831&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7b%22comm%22%3a%7b%22ct%22%3a24%7d%2c%22new_song%22%3a%7b%22module%22%3a%22QQMusic.MusichallServer%22%2c%22method%22%3a%22GetNewSong%22%2c%22param%22%3a%7b%22type%22%3a1%7d%7d%7d'
  return jsonp2(url, options2)
}
