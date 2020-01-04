import { SET_PLAY_LIST } from './actionTypes'

export const setPlayList = (playList = []) => ({
  type: SET_PLAY_LIST,
  payload: playList
})