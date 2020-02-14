import React, { Component } from 'react';
import classnames from 'classnames';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data, onChange } = this.props;
        const songItem = data.map((item) => {
            return (
                <div className={classnames('song-item')} key={item.id}>
                    <div className="common name" >{item.name}</div>
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
}

export default SongList;