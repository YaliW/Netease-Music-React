import React, { Component } from 'react';
import classnames from 'classnames';
import { audio } from '../utils';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data, onChange, playingSong } = this.props;
        const songItem = data.map((item) => {
            return (
                <div className={classnames('song-item', playingSong.id === item.id ? 'selected' : '')} key={item.id}>
                    <div className="common name" onClick={this.handlePlay.bind(this,item)}>{item.name}</div>
                    <div className="common blank">
                        <div className="delete" onClick={() => { onChange(item.id); }}></div>
                    </div>
                    <div className="common author">{item.author[0].name}</div>
                    <div className="common duration">{item.durationTime}</div>
                    <div className="source"><a></a></div>
                </div>
            )
        })
        return (
            <div className="song-list-container-left">
                {songItem}
            </div>
        )
    }

    handlePlay(param) {
        const { setPlayingSong } = this.props;
        const id = param.id;
        const coverImgUrl = param.coverImgUrl;
        const src = param.src;
        const playListId = param.playListId;
        const author = param.author;
        const name = param.name;
        const payload = {
            id: id,
            src: src,
            coverImgUrl: coverImgUrl,
            songName: name,
            playListId: playListId,
            author: author
        }
        setPlayingSong(payload);
        
    }
}

export default SongList;