import jsonp from './jsonp'
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
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    n: perpage,
    t: 0,
    needNewCode: 0,
    platform: 'yqq.json'
  })

  return jsonp(url, data, options)
}
