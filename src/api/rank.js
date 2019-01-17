import jsonp, { jsonp2 } from './jsonp'
import $ from 'jquery'
import { commonParams, options, options2 } from './config'
import RGBaster from 'rgbaster'

// 获取Top榜单
export function getTopList() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&tpl=macv4&v8debug=1',
      type: 'get',
      dataType: 'jsonp',
      jsonpCallback: 'jsonCallback',
      success: resolve,
      error: reject
    })
  })
}

// 根据top榜单id获取榜单中音乐列表
export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

// 获取专辑列表
export function getAlbumList() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI1408273264438482&g_tk=37988991&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22albumlib%22%3A%7B%22method%22%3A%22get_album_by_tags%22%2C%22param%22%3A%7B%22area%22%3A7%2C%22company%22%3A-1%2C%22genre%22%3A-1%2C%22type%22%3A-1%2C%22year%22%3A-1%2C%22sort%22%3A2%2C%22get_tags%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A20%2C%22click_albumid%22%3A0%7D%2C%22module%22%3A%22music.web_album_library%22%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
  return jsonp2(url, options2)
}

// 根据专辑ID获取专辑详情
export function getAlbumByID(albummid) {
  const url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?ct=24&albummid=${albummid}&_tk=37988991&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
  return jsonp2(url, options)
}

// 获取图片主题色
export function getImageColor(img) {
  return new Promise((resolve, reject) => {
    // canvas不允许获取跨域资源的数据，利用服务器代理的方法，解决跨域问题。
    const URl = `http://74.82.206.121:8888/api/img?0=${img}`;
    RGBaster.colors(URl, {
      // 调色板大小
      paletteSize: 50,
      exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
      success: function(payload) {
        const c = payload.dominant.match(/\d+/g);
        resolve(`rgb(${c[0]},${c[1]},${c[2]})`)
      }
    });
  })
}
