import { CHECK_PREV_NEXT } from '../../components/js/utils'

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
  // 在当前播放位置播放点击的音乐
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
  // 下一曲
  nextSong({ commit }){
    commit('NEXT_SONG')
  },
  // 上一曲
  prevSong({ commit }){
    commit('PREV_SONG')
  },
  // 从播放列表中删除一首歌曲
  delSong({ commit }, index) {
    commit('DEL_SONG', index)
  },
  // 替换播放列表
  replacePlayList({ commit }, list) {
    commit('REPLACE_PLAY_LIST', list)
  },
  // 配置VKey
  setVKey({ commit }, vkey) {
    commit('SET_VKEY', vkey)
  },
  // 配置GUID
  setGuid({ commit }, guid) {
    commit('SET_GUID', guid)
  },
  // 添加歌曲到下一首播放
  addSongToNext({ commit, state }, song) {
    let hadTheSong = false
    let i
    state.list.forEach((item, index) => {
      if (item.id === song.id) {
        hadTheSong = true
        i = index
      }
    })
    if (hadTheSong) {
      commit('DEL_SONG', i)
    }
    commit('ADD_SONG_TO_NEXT', song)
  },
  // 添加歌曲到播放列表最后
  addSongToLast({ commit, state }, song) {
    let hadTheSong = false
    let i
    state.list.forEach((item, index) => {
      if (item.id === song.id) {
        hadTheSong = true
        i = index
      }
    })
    if (hadTheSong) {
      commit('DEL_SONG', i)
    }
    commit('ADD_SONG_TO_LAST', song)
  },
  // 改变当前播放位置
  changeIndex({ commit }, index) {
    commit('CHANGE_INDEX', index)
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
    CHECK_PREV_NEXT(state)
  },
  NEXT_SONG(state) {
    const length = state.list.length
    if (state.index < length - 1){
      state.index++
    }
    CHECK_PREV_NEXT(state)
  },
  PREV_SONG(state) {
    if (state.index > 0) {
      state.index--
    }
    CHECK_PREV_NEXT(state)
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
    CHECK_PREV_NEXT(state)
  },
  DEL_SONG(state, index) {
    if (index === state.index) {
      state.index = index - 1
    }
    state.list.splice(index, 1)
  },
  ADD_SONG_TO_NEXT(state, song) {
    if ((state.list.length > 0 && state.list.length - 1 === state.index) || state.list.length === 0) {
      state.list.push(song)
    } else {
      state.list.splice(state.index + 1, 0, song)
    }
    CHECK_PREV_NEXT(state)
  },
  ADD_SONG_TO_LAST(state, song) {
    state.list.push(song)
    CHECK_PREV_NEXT(state)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
