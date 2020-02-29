import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';

class PlayList extends Component {
    get formateData () {
        const { data } = this.props;
        return data.reduce((prev, curr, index) => {
            if (index % 5 === 0) {
                prev.push([curr]);
            } else {
                const target = prev.pop();
                target.push(curr);
                prev.push(target);
            }
            return prev;
        }, []);
    }

    render() {
        const cardRow = this.formateData.map((item, index) => {
            const cardCol = item.map((subitem, subIndex) => {
                const path = `/playlistDetail/${subitem.id}`;
                return (
                    <NavLink to={path} activeClassName="selected">
                        <div className="navlink-card-column" key={subIndex}>
                            <div className="playlist-cover-image">
                                <img src={subitem.coverImage} alt=""/>
                                <div className="play-count">播放量： {subitem.playCount}</div>
                            </div>
                            <p className="playlist-name">{subitem.name}</p>
                            <p className="playlist-user-name">by {subitem.userName}</p>
                        </div>
                    </NavLink>
                )
            })
            const itemLen = item.length;
            const customWidth = itemLen * 140 + (itemLen - 1) * 50;

            const width = {
                width: itemLen < 5 ? customWidth : ''
            }
            return (
                <div className="card-row" style={width} key={index}>
                    {cardCol}
                </div>
            )
        })
        return (
            <div className="music-card-layout"> 
                {cardRow}
            </div>
        )
    }
}

export default PlayList;
