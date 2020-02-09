import { SET_PLAY_LIST_DETAIL } from './actionTypes'

export const setPlayListDetail = (playListDetail = {}) => ({
    type: SET_PLAY_LIST_DETAIL,
    payload: playListDetail
})