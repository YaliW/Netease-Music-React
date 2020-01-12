import { SET_PLAY_LIST, SET_TOTAL_PLAY } from './actionTypes'

// payload is the returned async res
export const setPlayList = (playList = []) => ({
  type: SET_PLAY_LIST,
  payload: playList
});

export const setTotalPlay = (totalPlay = 0) => ({
  type: SET_TOTAL_PLAY,
  payload: totalPlay
})