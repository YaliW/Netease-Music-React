import { SET_IS_PLAY, SET_PLAYING_SONG } from './actionTypes';

export const setIsPlay = (isPlay = false) => (
    {
        type: SET_IS_PLAY,
        payload: isPlay,
    }
)

export const setPlayingSong = (playingSong = {}) => (
    {
        type: SET_PLAYING_SONG,
        payload: playingSong,
    }
)