import jsonp from './jsonp'
import { jsonp2 } from './jsonp'
import { commonParams, options } from './config'

// 获取验证用的秘钥
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

// 音乐搜索接口
export function search(query, page, perpage) {
  const url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&n=${perpage}&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&p=${page}&w=${query}`
  return jsonp2(url, options)
}
