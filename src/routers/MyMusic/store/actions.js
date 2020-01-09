import { SET_MY_PLAY_LIST, SET_PLAY_LIST_DETAIL } from './actionTypes'

// payload is the returned async res
export const setMyPlayList = (myPlayList = []) => ({
  type: SET_MY_PLAY_LIST,
  payload: myPlayList
});

export const setPlayListDetail = (playListDetail = {}) => ({
    type: SET_PLAY_LIST_DETAIL,
    payload: playListDetail
})