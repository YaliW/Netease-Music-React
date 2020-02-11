import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { localStorageGetItem } from '../utils';
import SongList from './SongList';

class SongListPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: localStorageGetItem('playingSongObj'),
            dataArr: localStorageGetItem('playingSongIdArr'),
        }
    }

    get playSongList() {
        const { data, dataArr } = this.state;
        const arr = [];
        for (const item of dataArr) {
            arr.push(data[item])
        }
        return arr; 
    }

    render() {
        const len = 10;
        const songName = 'song name';
        const { onChange } = this.props;
        return (
            <div className="song-list-panel-container">
                <div className="title">
                    <h4 className="name">{'播放列表('+len+')'}</h4>
                    <div className="song-name">{songName}</div>
                    <div className="close" onClick={onChange.bind(this)}></div>
                </div>
                <div className="content">
                    <SongList data={this.playSongList}></SongList>
                    {/* <Lyric :lyric="lyric" :playedTimeSec="playedTimeSec"></Lyric> */}
                </div>
            </div>
        )
    }

}

SongListPanel.defaultProps = {
    onChange: () => {}
}

SongListPanel.propTypes = {
    onChange: PropTypes.func
}

export default SongListPanel;