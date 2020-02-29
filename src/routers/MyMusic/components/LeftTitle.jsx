import React, {Component} from 'react'
import PropTypes from 'prop-types'

class LeftTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { data, onChange } = this.props;
        const songList = data.map((item, index) => {
            return (
                <div className="song-list" key={index} onClick={() => onChange(item.id)}>
                    <div className="image">
                        <img src={item.coverImgUrl} alt="" />
                    </div>
                    <div className="song-list-content">
                        <div className="song-list-name">{item.name}</div>
                        <div className="song-list-info">
                            <div className="song-length">{item.trackCount}首&ensp; </div>
                            <div className="song-author">by {item.creatorNickName}</div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="song-list-container">
                <div className="title">收藏的歌单({data.length})</div>
                {songList}
            </div>
        )
    }
}

LeftTitle.defaultProps = {
    data: [],
    onChange: () => {}
}

LeftTitle.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func
}

export default LeftTitle;
