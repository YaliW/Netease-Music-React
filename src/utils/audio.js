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
            this.onPlay();
        });
        this.EE.on(this.audioEvent.SETSRC, (options) => {
            console.log(options, 'options')
            this.setSrc(options.src, options.autoplay);
        })
    }

    emitPlay = () => {
        this.EE.emit(this.audioEvent.PLAY, '1', '2')
    }

    onPlay = () => {
        this.audioDOM.play();
        console.log(this.audioDOM, 'this.audioDOM');
    }

    emitSetSrc = (param) => {
        this.EE.emit(this.audioEvent.SETSRC, param);
    }   

    setSrc = (src, autoplay = true) => {
        this.audioDOM.src = src;
        this.audioDOM.autoplay = autoplay;
    }
}

export default new Audio();