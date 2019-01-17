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

export const FLAC = 1

export const MP3_320K = 2

export const MP3_128K = 3
