import { options2 } from './config'
import store from '../vuex/store'
import { jsonp2 } from './jsonp'

// 根据歌曲mid获取歌词
export function getLyric(mid) {
  return jsonp2(`http://musicapi.tx114.5644.pw/api/getMusicLyric.php?id=${this.$route.params.id}`, { name: 'callback' })
}

/**
 * randomWord 产生任意长度随机字母数字组合
 * @param randomFlag 是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 * @param min
 * @param max
 * @returns {string}
 */
function randomWord(randomFlag, min, max) {
  var pos
  var str = '',
    range = min,
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}


// 获取VKey
export function getVKey() {
  const guid = randomWord(false, 6)
  store.dispatch('setGuid', guid)
  const url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=0&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=003a1tne1nSz1Y&filename=C400003a1tne1nSz1Y.m4a&guid=${guid}`
  return jsonp2(url, options2)
}

// 获取TOP所有数据
export function getNewSong() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom6930851858851761&g_tk=1288021831&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7b%22comm%22%3a%7b%22ct%22%3a24%7d%2c%22new_song%22%3a%7b%22module%22%3a%22QQMusic.MusichallServer%22%2c%22method%22%3a%22GetNewSong%22%2c%22param%22%3a%7b%22type%22%3a1%7d%7d%7d'
  return jsonp2(url, options2)
}
