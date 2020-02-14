import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { localStorageGetItem } from '../utils';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songListLen: localStorageGetItem('playingSongIdArr').length
        }
    }

    componentDidMount() {
        window.addEventListener('setItem', () => {
            this.setState({
                songListLen: localStorageGetItem('playingSongIdArr').length
            })
        })
    }

    render() {
        const { onChange } = this.props;
        const { songListLen } = this.state;
        return (
            <div className="player-container-wrapper">
                <div className="player-container">
                    <div className="left">
                        <div className="btn">
                            <span className="prev-song"></span>
                            <span className="pause"></span>
                            <span className="next-song"></span> 
                        </div>

                        <div className="head-img">
                            <img src="../assets/img/song_img.jpeg" alt=""/>
                        </div>

                        <div className="play-status">
                            <div className="play-title">
                                <div className="song-name">因为理想</div>
                                <div className="singer">逃跑计划</div>
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
}

Player.defaultProps = {
    onChange: () => {}
}

Player.propTypes = {
    onChange: PropTypes.func
}

export default Player;