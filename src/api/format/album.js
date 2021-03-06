export default class Album {
  constructor({ id, mid, name, img }) {
    this.id = id
    this.name = name
    this.img = img
  }
}

export function createAlbum(itemData) {
  return new Album({
    id: itemData.album_mid,
    name: itemData.album_name,
    img: `//y.gtimg.cn/music/photo_new/T002R300x300M000${itemData.album_mid}.jpg?max_age=2592000`
  })
}

export function createList(itemData) {
  return new Album({
    id: itemData.topID,
    name: itemData.ListName,
    img: itemData.pic_v12
  })
}

export function createSinger(itemData) {
  return new Album({
    id: itemData.Fsinger_mid,
    name: itemData.Fsinger_name,
    img: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${itemData.Fsinger_mid}.jpg?max_age=2592000`
  })
}

export function createPlayList(itemData) {
  return new Album({
    id: itemData.tid,
    name: itemData.title,
    img: itemData.cover_url_big
  })
}
