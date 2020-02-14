import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { localStorageGetItem, localStorageSetItem } from '../utils';
import SongList from './SongList';

class SongListPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playSongList: this.getStateFromLocalStorage()
        }
    }

    componentDidMount() {
        window.addEventListener('setItem', ()=> {
            this.setState({ playSongList: this.getStateFromLocalStorage() });
        });
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    getStateFromLocalStorage () {
        const data = localStorageGetItem('playingSongObj');
        const dataArr =  localStorageGetItem('playingSongIdArr');
        return (dataArr || []).map(item => data[item] || null);
    }
 
    render() {
        const { playSongList } = this.state;
        const songName = 'song name';
        const len = playSongList.length;
        const { onChange } = this.props;
        return (
            <div className="song-list-panel-container">
                <div className="title">
                    <h4 className="name">{'播放列表('+len+')'}</h4>
                    <div className="song-name">{songName}</div>
                    <div className="close" onClick={onChange.bind(this)}></div>
                </div>
                <div className="content">
                    <SongList data={playSongList} onChange={this.deleteSongList}></SongList>
                    {/* <Lyric :lyric="lyric" :playedTimeSec="playedTimeSec"></Lyric> */}
                </div>
            </div>
        )
    }

    // 箭头函数的作用域是定义时的作用域，箭头函数的作用域不被bind 影响改变
    deleteSongList = (param) => {
        const playingSongObj = localStorageGetItem('playingSongObj');
        const playingSongIdArr = localStorageGetItem('playingSongIdArr');

        delete playingSongObj[param];
        console.log(param, 'params');
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