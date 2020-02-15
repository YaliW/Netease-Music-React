import getAudioEvent from '../config/AudioEvent'
import EventEmitter from 'eventemitter3'

class Audio {
    constructor(props) {
        this.audioEvent = getAudioEvent('');
        this.audioDOM = document.getElementById('netease-music-player'); // 得到index.html中audio标签DOM元素
        this.EE = new EventEmitter();
    }

    initialPlayer = () => {
        this.EE.on(this.audioEvent.PLAY, () => {
            this.play();
        });
        this.EE.on(this.audioEvent.SETSRC, (options) => {
            this.setSrc(options.src, options.autoplay);
        });
        this.EE.on(this.audioEvent.PAUSE, () => {
            this.pause();
        })
    }

    // emit event
    emitPlay = () => {
        this.EE.emit(this.audioEvent.PLAY)
    }

    emitPause = () => {
        this.EE.emit(this.audioEvent.PAUSE)
    }

    emitSetSrc = (param) => {
        this.EE.emit(this.audioEvent.SETSRC, param);
    }   
    // end

    // 播放
    play = () => {
        this.audioDOM.play();
    }

    // 暂停
    pause = () => {
        this.audioDOM.pause();
    }

    // setSrc 会自动播放
    setSrc = (src, autoplay = true) => {
        this.audioDOM.src = src;
        this.audioDOM.autoplay = autoplay;
    }
}

export default new Audio();