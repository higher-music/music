import store from '@/vuex/store'
import { getLyric } from '@/api/song'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, albummid }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
    this.mp3_128k = `http://mobileoc.music.tc.qq.com/M500${mid}.mp3?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&uin=0&fromtag=8`
    this.mp3_320k = `http://mobileoc.music.tc.qq.com/M800${mid}.mp3?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&uin=0&fromtag=8`
    this.flac = `http://mobileoc.music.tc.qq.com/F000${mid}.flac?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&uin=0&fromtag=53`
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
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    albummid: musicData.albummid
  })
}

export function createSong2(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: 0,
    albummid: musicData.album.mid
  })
}

function filterSinger(singer) {
  return singer.map(v => {
    return { name: v.name, mid: v.mid }
  })
}
