import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { localStorageGetItem, localStorageSetItem} from '../utils'

class PlayListContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            isCanOpen: false,
        };
    }

    // 从父组件传入数据的id 作为key, 所以当数据变化时，会重新渲染子组件，会调用 componentDidMount
    componentDidMount() {
        this.computeIsClosed();
    }

    render() {
        const { opened, isCanOpen } = this.state;
        const { data, className } = this.props;
        const { tags, tracks } = data;

        let markContent = null;

        if (tags && tags.length > 0) {
            const tagsDom = tags.map((item) => {
                return (
                    <div className="mark-content"  key={item}>
                        {item}
                    </div>
                )
            })
            markContent = (
                <div className="song-mark">
                    <div className="mark">标签：</div>
                    {tagsDom}
                </div>
            )
        }

        let isCanOpenDom = null;

        if (isCanOpen) {
            isCanOpenDom = (
                <div className="detail-operation-btn" onClick={() => this.handleDescriptionToggle()}>
                    <span>{ opened ? '收起' : '展开' }</span>
                </div>
            )
        }

        let tracksDom = null;
        if (tracks) {
            tracksDom = tracks.map((item, index) => {
                const { author } = tracks;
                let authorDom = null;
                if (author) {
                    authorDom = author.map((item) => {
                        return (
                            <span key={index}>{item.name}</span>
                        )
                    })
                }
                return (
                    <div className={`song-list-content ${index%2===0 ? 'odd' : ''}`} key={index}>
                    <div className="first-title common">{index+1}
                        <span className="play-icon" onClick={this.handlePlay.bind(this, item)}></span>
                    </div>
                    <div className="second-title common black-color">{item.name}</div>
                    <div className="third-title common">{item.durationTime}</div>
                    <div className="fourth-title common black-color">
                        {authorDom}
                    </div>
                    <div className="fifth-title common black-color">{item.collection}</div>           
                </div>
                )
            })
        }
        
        return (
            <div className={classnames("song-content-container", className)}>
            <div className="song-introduction">
                <div className="image-border">
                    <img src={data.coverImgUrl} alt="" />
                </div>
                <div className="introduction-content">
                    <div className="song-name">
                        <div className="song-list-icon">
                            <span className="icon"></span>
                        </div>
                        <div className="name">{data.name}
                        </div>
                    </div>
    
                    <div className="song-author">
                        <img src={data.creatorAvatarUrl} alt="" />
                        <div className="author-name">{data.creatorNickName}</div>
                        <div className="create-time">{data.createTime} 创建</div>
                    </div>
    
                    <div className="song-play-button" onClick={this.addToPlayingSongList.bind(this)}>
                        <div className="play-icon"></div>
                        <div className="play">播放</div>
                    </div>
    
                    {markContent}
    
                    {/* 使用 ref 定位元素 */}
                    <p ref="descRef" className={ `song-detail ${!opened ? 'closed' : ''}` }>
                        {data.description}
                    </p>
                    {isCanOpenDom}
                </div>
            </div>
            <div className="song-list-content-container">
                <div className="left-side">
                    <div className="song-list-name">歌曲列表</div>
                    <div className="song-list-length">{data.trackCount}首歌</div>
                </div>
                <div className="play-count">播放：<span>{data.playCount}</span> 次</div>
            </div>
            <div className="song-list-table">
                <div className="common first-title">&nbsp;</div>
                <div className="common second-title">歌曲标题</div>
                <div className="common third-title">时长</div>
                <div className="common fourth-title">歌手</div>
                <div className="common fifth-title">专辑</div>
            </div>
    
            {tracksDom}
        </div>
        )
    }

    handleDescriptionToggle () {
        const prevOpened = this.state.opened;
        this.setState({
            opened: !prevOpened
        })
    }

    computeIsClosed() {
        // ref 加在普通的元素上，用ReactDOM.findDOMNode 获取到的是dom元素
        const descRef = ReactDOM.findDOMNode(this.refs.descRef);
        if (descRef) {
            const clientHeight = descRef.clientHeight; // 可视窗口的高度，包括可是窗口的高度加padding
            const scrollHeight = descRef.scrollHeight; // 文档或元素真实的高度，相对 Scroll 的高度，包括被scroll 隐藏的内容的真正高度加padding
            const isClosed =  clientHeight < scrollHeight;

            if (isClosed) {
                // 初始化是展开的，则isCanOpen is true
                this.setState({
                    opened: !isClosed,
                    isCanOpen: true
                })
            } else {
                this.setState({
                    opened: false,
                    isCanOpen: false
                })
            }
        }
    }

    addToPlayingSongList() {
        const { tracks, songUrlMap, coverImgUrl } = this.props.data;
        const playListId = this.props.id;
        const playingSongObj = localStorageGetItem('playingSongObj');
        let playingSongIdArr = localStorageGetItem('playingSongIdArr');
        if (Object.keys(playingSongIdArr).length === 0) {
            playingSongIdArr = [];
        }

        tracks.forEach((item) => {
            const id = item.id;
            if (!playingSongObj.hasOwnProperty(id)) {
                const url = songUrlMap[id];
                item['src'] = url;
                item['coverImgUrl'] = coverImgUrl;
                item['playListId'] = playListId;
                playingSongObj[id] = item;
                playingSongIdArr.push(id);
            }
        });
        localStorageSetItem('playingSongObj', playingSongObj);
        localStorageSetItem('playingSongIdArr', playingSongIdArr);
        
        if (tracks.length > 0) {
            const song = tracks[0];
            const { setPlayingSong, setIsPlay } = this.props;
            const payload = {
                id: song.id,
                src: songUrlMap[song.id],
                coverImgUrl: coverImgUrl,
                songName: song.name,
                playListId: playListId,
                author: song.author
            }

            setPlayingSong(payload);
            setIsPlay(true);

        }
    }

    handlePlay(param) {
        const { setPlayingSong, setIsPlay } = this.props;
        const playListDetail = this.props.data;
        
        const id = param.id;
        const coverImgUrl = playListDetail.coverImgUrl;
        const src = playListDetail.songUrlMap[param.id];
        const playListId = playListDetail.id;
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
        setIsPlay(true);

        const data = {
            id: id,
            name: name,
            author: author,
            collection: param.collection,
            durationTime: param.durationTime,
            coverImgUrl: coverImgUrl,
            playListId: playListId,
            src: src,
        }
        const playingSongObj = localStorageGetItem('playingSongObj');
        const playingSongIdArr = localStorageGetItem('playingSongIdArr');

        if (!playingSongObj.hasOwnProperty(id)) {
            playingSongObj[id] = data;
            playingSongIdArr.push(id);
        }
        localStorageSetItem('playingSongObj', playingSongObj);
        localStorageSetItem('playingSongIdArr', playingSongIdArr);
    }
}

export default PlayListContent;