import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { localStorageGetItem } from '../utils';
import { audio } from '../utils';
import classnames from 'classnames';
import { setIsPlay } from '../layout/store/actions';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songListLen: localStorageGetItem('playingSongIdArr').length,
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
    }

    render() {
        const { onChange, isPlay, playingSong } = this.props;
        const { songListLen } = this.state;
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
                                <div className="bar">
                                    <div className="black-bar">
                                    </div>
                                    <div className="red-bar">
                                        <span></span>
                                    </div>
                                </div>
                                <div className="play-time"></div>
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
        setIsPlay(true);
    }
}

Player.defaultProps = {
    onChange: () => {}
}

Player.propTypes = {
    onChange: PropTypes.func
}

export default Player;