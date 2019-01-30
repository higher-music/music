const state = {
  // 已播放过的singer/list/album
  singer: new Map(),
  list: new Map(),
  album: new Map()
}

const actions = {
  addSinger({ commit }, data) {
    commit('ADD_SINGER', data)
  },
  addList({ commit }, data) {
    commit('ADD_LIST', data)
  },
  addAlbum({ commit }, data) {
    commit('ADD_ALBUM', data)
  }
}

const getters = {
  singer: state => state.singer,
  list: state => state.list,
  album: state => state.album
}

const mutations = {
  ADD_SINGER(state, data) {
    state.singer.set(...data)
  },
  ADD_LIST(state, data) {
    state.list.set(...data)
  },
  ADD_ALBUM(state, data) {
    state.album.set(...data)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
