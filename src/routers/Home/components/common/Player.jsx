import React, {Component} from 'react'

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="player-container-wrapper">
                <div className="player-container">
                    <div className="btn">
                        <span className="prev-song"></span>
                        <span className="pause"></span>
                        <span className="next-song"></span> 
                    </div>

                    <div className="head-img">
                        <img src="assets/img/song_img.jpeg" alt=""/>
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
                                <div className="red-bar"></div>
                            </div>
                            <div className="play-time"></div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Player;