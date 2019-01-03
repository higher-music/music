const state = {
  // 播放列表
  list: [],
  // 当前播放位置
  index: -1,
  // 歌曲链接验证用的秘钥
  vkey: '',
  // 用于获取VKey而生成的随机数
  guid: 0,
  // 是否还有上一首
  hasPrev: false,
  // 是否还有下一首
  hasNext: false
}

const actions = {
  addSongToCurrentIndex({ commit, state }, song){
    let hadTheSong = false
    let i
    state.list.forEach((item, index) => {
      if (item.id === song.id) {
        hadTheSong = true
        i = index
      }
    })
    if (!hadTheSong) {
      commit('ADD_SONG_TO_CURRENT_INDEX', song)
    } else {
      commit('CHANGE_INDEX', i)
    }
  },
  nextSong({ commit }){
    commit('NEXT_SONG')
  },
  prevSong({ commit }){
    commit('PREV_SONG')
  },
  replacePlayList({ commit }, list) {
    commit('REPLACE_PLAY_LIST', list)
  },
  setVKey({ commit }, vkey) {
    commit('SET_VKEY', vkey)
  },
  setGuid({ commit }, guid) {
    commit('SET_GUID', guid)
  }
}

const getters = {
  playList: state => state.list,
  currentIndex: state => state.index,
  currentSong: state => state.list[state.index],
  getVKey: state => state.vkey,
  haveNext: state => state.hasNext,
  havePrev: state => state.hasPrev
}

const mutations = {
  ADD_SONG_TO_CURRENT_INDEX(state, song) {
    if (state.index < 0) {
      state.index = 0
    } else {
      state.index++
    }
    state.list.splice(state.index, 0, song)
  },
  NEXT_SONG(state) {
    const length = state.list.length
    if (state.index < length - 1){
      state.index++
    }
    state.hasNext = state.index > length - 2;
  },
  PREV_SONG(state) {
    if (state.index > 0) {
      state.index--
    }
    state.hasPrev = state.index < 1
  },
  REPLACE_PLAY_LIST(state, list) {
    state.list = list
  },
  SET_VKEY(state, vkey) {
    state.vkey = vkey
  },
  SET_GUID(state, guid) {
    state.guid = guid
  },
  CHANGE_INDEX(state, index) {
    state.index = index
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
