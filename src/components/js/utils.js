export function CHECK_PREV_NEXT(state) {
  state.hasNext = state.index < state.list.length - 1
  state.hasPrev = state.index > 0
}
