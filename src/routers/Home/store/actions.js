import { SET_PLAY_LIST } from './actionTypes'

// payload is the returned async res
export const setPlayList = (playList = []) => ({
  type: SET_PLAY_LIST,
  payload: playList
})