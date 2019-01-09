import store from '@/vuex/store'
import { getLyric } from '@/api/song'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, mp3_128k, mp3_320k, flac }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.mp3_128k = mp3_128k
    this.mp3_320k = mp3_320k
    this.flac = flac
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === 0) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(musicData) {
  console.log(musicData)
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    mp3_128k: `http://dl.stream.qqmusic.qq.com/M500${musicData.songmid}.mp3?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&uin=0&fromtag=64`,
    mp3_320k: `http://dl.stream.qqmusic.qq.com/M800${musicData.songmid}.mp3?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&uin=0&fromtag=64`,
    flac: `http://streamoc.music.tc.qq.com/F000${musicData.songmid}.flac?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&&uin=0&fromtag=8`
  })
}

function filterSinger(singer) {
  const ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join(' & ')
}

