export default class Album {
  constructor({ id, mid, name, img }) {
    this.id = id
    this.mid = mid
    this.name = name
    this.img = img
  }
}

export function createAlbum(itemData) {
  return new Album({
    id: itemData.album_id,
    mid: itemData.album_mid,
    name: itemData.album_name,
    img: `//y.gtimg.cn/music/photo_new/T002R300x300M000${itemData.album_mid}.jpg?max_age=2592000`
  })
}

export function createList(itemData) {
  return new Album({
    id: itemData.topID,
    mid: null,
    name: itemData.ListName,
    img: itemData.pic_v12
  })
}

export function createSinger(itemData) {
  return new Album({
    id: itemData.Fsinger_id,
    mid: itemData.Fsinger_mid,
    name: itemData.Fsinger_name,
    img: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${itemData.Fsinger_mid}.jpg?max_age=2592000`
  })
}
