const prefix = 'http://localhost:3000';
// const prefix = process.env.VUE_APP_TEMP

export default {
    getPlayList: {
        url: `${prefix}/top/playlist`,
        method: 'GET'
    },
    getMyPlayList: {
        url: `${prefix}/user/playlist`,
        method: 'GET'
    },
    getPlayListDetail: {
        url: `${prefix}/playlist/detail`,
        method: 'GET'
    },
    getSongUrl: {
        url: `${prefix}/song/url`,
        method: 'GET'
    },
    getLyric: {
        url: `${prefix}/lyric`,
        method: 'GET'
    },

};   