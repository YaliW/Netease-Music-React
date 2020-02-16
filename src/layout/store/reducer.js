import produce from 'immer';
import { SET_IS_PLAY, SET_PLAYING_SONG, SET_LYRIC } from './actionTypes';

const initState = {
    isPlay: false,
    playingSong: {
        id: 34341349,
        src: 'http://m10.music.126.net/20200131164944/8f281094c335148f33850c3dd7119d0c/ymusic/2daf/1b31/d403/e468cdf69e22118e4ad9b83bf53bf05f.mp3',
        coverImgUrl: '',
        songName: '',
        playListId: '',
        author: ''
    },
    lyric: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_IS_PLAY:
            return produce(state, nextState => {
                nextState.isPlay = action.payload
            });

        case SET_PLAYING_SONG:
            return produce(state, nextState => {
                nextState.playingSong = action.payload
            });
            
        case SET_LYRIC:
            return produce(state, nextState => {
                nextState.lyric = action.payload
            });

        default:
            return state;
    }
}