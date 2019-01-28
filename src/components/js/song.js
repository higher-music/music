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

export function createSong2(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: 0,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    mp3_128k: `http://dl.stream.qqmusic.qq.com/M500${musicData.mid}.mp3?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&uin=0&fromtag=64`,
    mp3_320k: `http://dl.stream.qqmusic.qq.com/M800${musicData.mid}.mp3?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&uin=0&fromtag=64`,
    flac: `http://streamoc.music.tc.qq.com/F000${musicData.mid}.flac?vkey=${store.state.playList.vkey}&guid=${store.state.playList.guid}&&uin=0&fromtag=8`
  })
}

export function createSong3(musicData) {
  return new Song({
    id: null,
    mid: musicData.id,
    singer: musicData.singer,
    name: musicData.name,
    album: null,
    duration: musicData.time,
    image: musicData.pic,
    mp3_128k: musicData.url,
    mp3_320k: musicData.url,
    flac: musicData.url
  })
}

function filterSinger(singer) {
  const ret = []
  singer.forEach((s) => {
    const singer = {
      name: s.name,
      mid: s.mid
    }
    ret.push(singer)
  })
  return ret
}
