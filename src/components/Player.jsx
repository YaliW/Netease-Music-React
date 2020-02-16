import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { localStorageGetItem } from '../utils';
import { audio } from '../utils';
import classnames from 'classnames';
import getAudioEvent from '../config/AudioEvent'

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songListLen: localStorageGetItem('playingSongIdArr').length,
            audioEvent: getAudioEvent(),
            playedWidth: 0,
            totalWidth: 493,
            playedTime: '00:00',
            totalTime: '00:00',
            playedTimeSec: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { playingSong } = this.props;
        if (playingSong.id !== nextProps.playingSong.id) {
            this.initialSong(nextProps.playingSong);
        }
    }

    componentDidMount() {
        window.addEventListener('setItem', () => {
            this.setState({
                songListLen: localStorageGetItem('playingSongIdArr').length
            })
        });
        audio.initialPlayer();  // on play
        audio.onTimeUpdate((options) => {
            this.onTimeUpdate(options);
        })
    }

    render() {
        const { onChange, isPlay, playingSong } = this.props;
        const { songListLen, playedTime, totalTime, totalWidth, playedWidth } = this.state;
        const barStyle = {
            width: totalWidth + 'px',
        }
        const playbarStyle = {
            width: playedWidth + 'px',
        }
        return (
            <div className="player-container-wrapper">
                <div className="player-container">
                    <div className="left">
                        <div className="btn">
                            <span className="prev-song"></span>
                            <span className={classnames("audio-status", !isPlay ? "play" : "pause")} onClick={() => this.handlePlay()}></span>
                            <span className="next-song"></span> 
                        </div>

                        <div className="head-img">
                            <img src="../assets/img/song_img.jpeg" alt=""/>
                        </div>

                        <div className="play-status">
                            <div className="play-title">
                                <div className="song-name">{playingSong.songName}</div>
                                <div className="singer">{playingSong.author.length > 0 ? playingSong.author[0].name : ''}</div>
                            </div>

                            <div className="play-bar">
                                <div className="bar" style={barStyle}>
                                    <div className="black-bar" style={playbarStyle}>
                                    </div>
                                    <div className="red-bar" style={playbarStyle}>
                                        <span></span>
                                    </div>
                                </div>
                                <div className="play-time">
                                    <span>{playedTime}</span> / {totalTime}
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div className="operation-btn">
                        <div className="volume"></div>
                        <div className="repeat"></div>
                        <div className="play-list-icon" onClick={onChange.bind(this)}>
                            <span>{songListLen}</span>
                        </div>
                    </div>
                </div>
                {/* <audio src="https://music.163.com/song/media/outer/url?id=34341349.mp3" draggable="true" controls="controls" /> */}
            </div>
        )
    }

    handlePlay() {
        const { isPlay, setIsPlay } = this.props;
        if (isPlay) {
            audio.emitPause();
            setIsPlay(!isPlay);
        } else {
            audio.emitPlay(); // emit play
            setIsPlay(!isPlay);
        }
    }

    initialSong(param) {
        const { setIsPlay } = this.props;
        const payload = {
            src: param.src,
            autoplay: true,
        }
        audio.emitSetSrc(payload); 
        audio.emitTimeUpdate();
        setIsPlay(true);
    }

    onTimeUpdate(param) {
        const { totalWidth } = this.state;
        const tempPlayedTimeSec = param.time;
        const duration = Math.round(param.duration);
        // 解决动画卡顿的方法是计算得到每秒的宽度，然后动画时间设置为1秒
        // this.playedTimeSec 当前播放时间每秒会更新，当更新的时候计算ratio，每秒会更新
        const ratio = tempPlayedTimeSec / duration;
        const tempPlayedTime = this.convertTimeFormat(tempPlayedTimeSec);
        const tempTotalTime = this.convertTimeFormat(duration);
        const tempPlayedWidth = totalWidth * ratio;

        this.setState({
            playedTime: tempPlayedTime,
            totalTime: tempTotalTime,
            playedWidth: tempPlayedWidth,
            playedTimeSec: tempPlayedTimeSec,
        })
    }

    convertTimeFormat(time) {
        const mins = Math.floor(time / 60);
        const minsFormat = mins < 10 ? '0'+mins : mins;
        const secs = time % 60;
        const secsFormat = secs < 10 ? '0'+secs : secs;
        return minsFormat + ':' + secsFormat;
    }
}

Player.defaultProps = {
    onChange: () => {}
}

Player.propTypes = {
    onChange: PropTypes.func
}

export default Player;