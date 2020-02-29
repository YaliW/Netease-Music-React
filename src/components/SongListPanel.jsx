import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { localStorageGetItem, localStorageSetItem } from '../utils';
import SongList from './SongList';
import Lyric from './Lyric';
import { audio } from '../utils/index';

class SongListPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playSongList: this.getStateFromLocalStorage(),
            playedTimeSec: 0,
        }
    }

    componentDidMount() {
        window.addEventListener('setItem', ()=> {
            this.setState({ playSongList: this.getStateFromLocalStorage() });
        });
        audio.onTimeUpdate((options) => {
            const { time } = options;
            this.setState({
                playedTimeSec: time,
            })
        })
    }

    getStateFromLocalStorage () {
        const data = localStorageGetItem('playingSongObj');
        const dataArr = localStorageGetItem('playingSongIdArr');
        return (dataArr || []).map(item => data[item] || null);
    }
 
    render() {
        const { playSongList, playedTimeSec } = this.state;
        const { setPlayingSong, playingSong, lyric } = this.props;
        const len = playSongList.length;
        const { onChange } = this.props;
        return (
            <div className="song-list-panel-container">
                <div className="title">
                    <h4 className="name">{'播放列表('+len+')'}</h4>
                    <div className="song-name">{playingSong.songName}</div>
                    <div className="close" onClick={onChange.bind(this)} />
                </div>
                <div className="content">
                    <SongList playingSong={playingSong} setPlayingSong={setPlayingSong} data={playSongList} onChange={this.deleteSongList} />
                    <Lyric lyric={lyric} playedTimeSec={playedTimeSec} />
                </div>
            </div>
        )
    }

    // 箭头函数的作用域是定义时的作用域，箭头函数的作用域不被bind 影响改变
    deleteSongList = (param) => {
        const playingSongObj = localStorageGetItem('playingSongObj');
        const playingSongIdArr = localStorageGetItem('playingSongIdArr');

        delete playingSongObj[param];
        // indexOf(-1) 会删除最后一个元素
        const index = playingSongIdArr.indexOf(param);
        playingSongIdArr.splice(index, 1);

        localStorageSetItem('playingSongObj', playingSongObj);
        localStorageSetItem('playingSongIdArr', playingSongIdArr);
    }

}

SongListPanel.defaultProps = {
    onChange: () => {}
}

SongListPanel.propTypes = {
    onChange: PropTypes.func
}

export default SongListPanel;
