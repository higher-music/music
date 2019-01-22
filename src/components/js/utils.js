export function CHECK_PREV_NEXT(state) {
  state.hasNext = state.index < state.list.length - 1
  state.hasPrev = state.index > 0
}

/**
 * @return {number}
 */
export function HAD_THE_SONG(state, songId) {
  let i = -1
  state.list.forEach((item, index) => {
    if (item && item.id === songId) {
      i = index
    }
  })
  return i
}

export function formatDate(now) {
  const date = new Date(parseInt(now * 1000))
  const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return minute + ':' + second
}

/**
 * @return {number}
 */
export function GET_RANDOM_NUM(begin, end) {
  return Math.round(Math.random() * (end - begin) + begin)
}
