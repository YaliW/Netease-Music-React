import getAudioEvent from '../config/AudioEvent'
import EventEmitter from 'eventemitter3'

class Audio {
    constructor(props) {
        this.audioEvent = getAudioEvent('');
        this.audioDOM = document.getElementById('netease-music-player'); // 得到index.html中audio标签DOM元素
        this.EE = new EventEmitter();  // 必须是同一个EventEmitter实例的 emit 和 on 才可以互相监听
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
        });
        // 需要劫持 audio的ontimeupdate 方法，并重写，绑定emitTimeUpdate方法。
        // 在播放时，每次执行原生方法ontimeupdate 时，取而代之的是执行emitTimeUpdate，把新的参数发射出去
        this.audioDOM.ontimeupdate = () => {
            this.emitTimeUpdate();
        }
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

    emitTimeUpdate = () => {
        const duration = this.audioDOM.duration;
        // 这里的ratio变化周期是duration/100, 共变化100次。
        // 每次ratio发生变化时，进度条会相应变化。由于每首歌的duration不同，导致ratio的变化周期不同，
        // 使用transition做动画的时候，不容易设置动画时间，会有动画卡顿
        const ratio = Math.round(this.audioDOM.currentTime * 100 / duration);
        const time = Math.round(this.audioDOM.currentTime);
        this.EE.emit(this.audioEvent.ONTIMEUPDATE, { ratio, time, duration });
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

    // 监听ONTIMEUPDATE，并把接收的emit的参数传递给callback
    onTimeUpdate(callback) {
        this.EE.on(this.audioEvent.ONTIMEUPDATE, (options) => {
            callback(options);
        })
    }

    on(eventName, callback) {
        this.EE.on(eventName, callback);
    }
    emit(eventName, ...params) {
        this.EE.emit(eventName, params);
    }
}

export default new Audio();