import jsonp, { jsonp2 } from './jsonp'
import { commonParams, options, options2 } from './config'
import { hexToRgb } from '../components/js/utils'

// 获取Top榜单
export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&tpl=macv4&v8debug=1&jsonCallback=jsonCallback'
  return jsonp2(url, { name: 'jsonCallback', param: 'jsonCallback', prefix: 'jsonCallback' })
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
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom6930851858851761&g_tk=1288021831&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7b%22comm%22%3a%7b%22ct%22%3a24%7d%2c%22new_album%22%3a%7b%22module%22%3a%22music.web_album_library%22%2c%22method%22%3a%22get_album_by_tags%22%2c%22param%22%3a%7b%22area%22%3a7%2c%22company%22%3a-1%2c%22genre%22%3a-1%2c%22type%22%3a-1%2c%22year%22%3a-1%2c%22sort%22%3a2%2c%22get_tags%22%3a1%2c%22sin%22%3a0%2c%22num%22%3a40%2c%22click_albumid%22%3a0%7d%7d%7d'
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
    const URl = `http://musicapi.tx114.5644.pw/api/img/getPrimaryColor.php?imgUrl=${img}`;
    jsonp2(URl, { name: 'callback' }).then(res => {
      const rgb = hexToRgb(res.data)
      const color = {
        btnColor: res.data,
        diffColor: false
      }
      if (rgb.r * 0.299 + rgb.g * 0.578 + rgb.b * 0.114 >= 192){ // 浅色
        color.btnColor = res.data
        color.diffColor = true
      }
      resolve(color)
    }).catch(err => {
      reject(err)
    })
    // RGBaster.colors(URl, {
    //   // 调色板大小
    //   paletteSize: 20,
    //   exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
    //   success: function(payload) {
    //     const color = {}
    //     const c = payload.dominant.match(/\d+/g);
    //     color.btnColor = `rgb(${c[0]},${c[1]},${c[2]})`
    //     // 转换成灰度值判断颜色深浅
    //     const grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
    //     if (grayLevel >= 192) {
    //       color.diffColor = true
    //     } else {
    //       color.diffColor = false
    //     }
    //     resolve(color)
    //   }
    // });
  })
}

// 获取推荐用户歌单
export function getPlayList() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom6930851858851761&g_tk=1288021831&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7b%22comm%22%3a%7b%22ct%22%3a24%7d%2c%22playlist%22%3a%7b%22method%22%3a%22get_playlist_by_category%22%2c%22param%22%3a%7b%22id%22%3a8%2c%22curPage%22%3a1%2c%22size%22%3a40%2c%22order%22%3a5%2c%22titleid%22%3a8%7d%2c%22module%22%3a%22playlist.PlayListPlazaServer%22%7d%7d'
  return jsonp2(url, options2)
}

// 获取歌单详情(需要校验referer)
export function getPlayListById(id) {
  const url = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${id}&g_tk=1628850096&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
  return jsonp2(url, options2)
}
