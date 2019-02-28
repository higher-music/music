import { CHECK_PREV_NEXT, HAD_THE_SONG, GET_RANDOM_NUM } from '@/components/js/utils'
import { MP3_128K, ORDER, RANDOM } from '@/api/config'

const state = {
  // 播放列表
  list: [],
  // 当前播放位置
  index: -1,
  // 歌曲链接验证用的秘钥
  vkey: '',
  // 用于获取VKey而生成的随机数K
  guid: 0,
  // 是否还有上一首
  hasPrev: false,
  // 是否还有下一首
  hasNext: false,
  // 音乐品质（1、flac，2、320K，3、128）
  type: MP3_128K,
  // 列表播放类型：顺序，随机，单曲循环
  playType: ORDER
}

const actions = {
  // 在当前播放位置播放点击的音乐
  addSongToCurrentIndex({ commit, state }, song){
    const i = HAD_THE_SONG(state, song.id)
    if (i < 0) {
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
  // 按顺序播放全部
  replacePlayList({ commit }, list) {
    commit('REPLACE_PLAY_LIST', list)
  },
  //
  playAllRandom({ commit }, list) {
    commit('PLAY_ALL_RANDOM', list)
  },
  // 连接播放列表，即播放列表PlayLatter
  contactPlayList({ commit }, list) {
    commit('CONCAT_PLAY_LIST', list)
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
    const i = HAD_THE_SONG(state, song.id)
    if (i > -1) {
      commit('DEL_SONG', i)
    }
    commit('ADD_SONG_TO_NEXT', song)
  },
  // 添加歌曲到播放列表最后
  addSongToLast({ commit, state }, song) {
    const i = HAD_THE_SONG(state, song.id)
    if (i > -1) {
      commit('DEL_SONG', i)
    }
    commit('ADD_SONG_TO_LAST', song)
  },
  // 改变当前播放位置
  changeIndex({ commit }, index) {
    commit('CHANGE_INDEX', index)
  },
  changeType({ commit }, type) {
    commit('CHANGE_TYPE', type)
  },
  clearAllSong({ commit }) {
    commit('CLEAR_ALL_SONG')
  },
  // 改变歌单播放模式
  changePlayType({ commit }, playType) {
    commit('CHANGE_PLAY_TYPE', playType)
  }
}

const getters = {
  playList: state => state.list,
  currentIndex: state => state.index,
  currentSong: state => state.list[state.index],
  getVKey: state => state.vkey,
  haveNext: state => state.hasNext,
  havePrev: state => state.hasPrev,
  getType: state => state.type,
  getPlayType: state => state.playType
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
    switch (state.playType) {
      case ORDER:
        if (state.index < length - 1){
          state.index++
        }
        break
      case RANDOM:
        state.index = GET_RANDOM_NUM(0, length - 1)
        break
      default:
        break
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
    state.list = [].concat(list)
    state.index = 0
    CHECK_PREV_NEXT(state)
  },
  PLAY_ALL_RANDOM(state, list) {
    state.list = [].concat(list)
    state.index = GET_RANDOM_NUM(0, list.length - 1)
    state.playType = RANDOM
    CHECK_PREV_NEXT(state)
  },
  CONCAT_PLAY_LIST(state, list) {
    state.list = state.list.concat(list)
    if (state.index < 0) {
      state.index = 0
    }
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
    if (index < state.index) {
      state.index--
    } else if (index === state.list.length - 1 && index === state.index) {
      state.index = index - 1
    } else if (index === 0 && index === state.index) {
      state.index = -1
    }
    state.list.splice(index, 1)
  },
  CLEAR_ALL_SONG(state) {
    state.list = []
    state.index = -1
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
  },
  CHANGE_TYPE(state, type) {
    state.type = type
  },
  CHANGE_PLAY_TYPE(state, type) {
    state.playType = type
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
