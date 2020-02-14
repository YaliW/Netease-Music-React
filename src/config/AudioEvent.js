const prefix = 'NETEASE_MUSIC_';

export const privateEvent = {

};

// 定义播放器的不同状态
export default function (controller = '') {
    return {
        PLAY: prefix + 'PLAY', // 广播的，所有人都可以接收
        PAUSE: prefix + 'PAUSE',
        SETSRC: prefix + 'SETSRC',
        SETCONTROLL: prefix + 'SETCONTROLL',
        INITIALAUDIO: prefix + 'INITIALAUDIO',
        ONENDED: prefix + controller + 'ENDED', // 单播，只会通知指定的controller
        ONTIMEUPDATE: prefix + controller + 'ONTIMEUPDATE', 
        ONCANPLAY: prefix + controller + 'ONCANPLAY',
        ONERROR: prefix + controller + 'ONERROR',
        ONPLAYING: prefix + controller + 'ONPLAYING',
        ONCANPLAYTHROUGH: prefix + controller + 'ONCANPLAYTHROUGH',
        ONPLAY: prefix + 'ONPLAY',
        ONPAUSE: prefix + 'ONPAUSE',
    };
}