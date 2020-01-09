import React, {Component} from 'react'

class RightContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            isCanOpen: false,
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     const { id } = this.props.data; // ES6 的析构
    //     console.log(id, this.props, 'id')
    //     if (id !== nextProps.data.id) {
    //         const isClosed = this.computeIsClosed();
    //         console.log(isClosed, 'isClosed')
    //         if (isClosed) {
    //             // 初始化是展开的，则isCanOpen is true
    //             this.setState({
    //                 opened: !isClosed,
    //                 isCanOpen: true
    //             }, ()=> {
    //                 console.log(this.state)
    //             })
    //         } else {
    //             this.setState({
    //                 opened: false,
    //                 isCanOpen: false
    //             })
    //         }
    //     }
    // }

    handleDescriptionToggle () {
        const prevOpened = this.state.opened;
        this.setState({
            opened: !prevOpened
        })
    }

    computeIsClosed() {
        // console.log(this.refs.descRef, 'refs');
        // ref 加在普通的元素上，用this.ref.name 获取到的是dom元素
        // refs:一个对象，持有注册过 ref 特性 的所有 DOM 元素和组件实例 注意：refs只会在组件渲染完成之后生效，并且它们不是响应式的
        const descRef = this.refs.descRef;
        if (descRef) {
            const clientHeight = descRef.clientHeight; // 可视窗口的高度
            const scrollHeight = descRef.scrollHeight; // 文档或元素真实的高度，相对 Scroll 的高度
            console.log(clientHeight, scrollHeight, clientHeight < scrollHeight )
            const isClosed =  clientHeight < scrollHeight;

            if (isClosed) {
                // 初始化是展开的，则isCanOpen is true
                this.setState({
                    opened: !isClosed,
                    isCanOpen: true
                }, ()=> {
                    console.log(this.state)
                })
            } else {
                this.setState({
                    opened: false,
                    isCanOpen: false
                })
            }
        }
    }

    componentDidMount() {
        // const temp = this.computeIsClosed();
        // console.log(this.descRef.current, 'this.descRef.current')
        // let initialNode  =  findDomNode(this.refs.descRef);
        // console.log(this.refs.descRef.clientHeight, 'initialNode')

        this.computeIsClosed()
    }

    componentDidUpdate() {
        this.computeIsClosed()
    }

    render() {
        const { opened, isCanOpen } = this.state;
        const { data } = this.props;
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
        console.log(isCanOpen, isCanOpenDom)

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
                        <span className="play-icon"></span>
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
            <div className="song-content-container">
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
    
                    <div className="song-play-button">
                        <div className="play-icon"></div>
                        <div className="play">播放</div>
                    </div>
    
                    {markContent}
    
                    <p ref={node => this.descRef = node} className={ `song-detail ${!opened ? 'closed' : ''}` }>
                        {data.description}
                    </p>
                    {/* <div v-if="isCanOpen" class="detail-operation-btn" v-on:click="handleDescriptionToggle">
                        <span>{{ opened ? '收起' : '展开' }}</span>
                    </div> */}
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
}

export default RightContent;