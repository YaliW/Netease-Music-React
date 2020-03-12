import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { setMyPlayList, setPlayListDetail, getMyPlayList, getPlayListDetail } from '../store/actions'
import { setPlayingSong, setIsPlay } from 'layout/store/actions'

import LeftTitle from '../components/LeftTitle'
import PlayListContent from 'components/PlayListContent'
import LayoutWrapper from 'layout/container/index'

class MyMusic extends React.Component {
    constructor(props) {
        super(props);
        this.songProcessTimeChange = this.songProcessTimeChange.bind(this);

        this.state = {
            playListId: null,
            songlist: [],
            songProcessTime: null,

        };

        const payload = {
            uid: 1832132513
        };
        // 调用的是 connect mapDispatchToProps 封装之后的 action
        props.getMyPlayList(payload)
    }

    handleClick(param) {
      this.props.getPlayListDetail({
        id: param
      });
    }

    songProcessTimeChange(time) {
        this.setState({
            songProcessTime: time,
        });
    }

    render() {
        const { myPlayList, playListDetail } = this.props;

        return (
            <div className="my-music-container">
                <LeftTitle className="left-title" data={myPlayList} onChange={this.handleClick.bind(this)} />
                <PlayListContent
                    key={playListDetail.id}
                    id={playListDetail.id}
                    className="right-content"
                    data={playListDetail}
                    setPlayingSong={setPlayingSong}
                    setIsPlay={setIsPlay}
                />
            </div>
        );
    }
}

MyMusic.propTypes = {
    myPlayList: PropTypes.array.isRequired,
    setMyPlayList: PropTypes.func.isRequired,
    playListDetail: PropTypes.object.isRequired,
    setPlayListDetail: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    myPlayList: state.myMusic.myPlayList,
    playListDetail: state.myMusic.playListDetail,
});

const mapDispatchToProps = {
  setMyPlayList,
  setPlayListDetail,
  setPlayingSong,
  setIsPlay,
  getMyPlayList,
  getPlayListDetail
};

// connect 可以访问到 Store， React 组件

// connect 用来连接 action 和 Reducer，
// 方法是 封装 action，
// 封装之后的action 的功能是 执行action，并且把 action 的结果 dispatch 给 Reducer
// mapDispatchToProps 是对象，用来传递 原始 action 传输给 connect

// state 更新之后，怎么 触发 view 更新
// mapStateToProps 是一个函数，对 state 进行过滤，只取本组件需要的数据
// connect 在初始化时 会建立监听，监听这 Store 中state的变化，（‘state’，handler ）
// 在 handler 里会获取 mapStateToProps 对应的过滤的值是否发生变化
// 如果发生变化，更新 props，则调用 MyMusic 的 再次渲染过程

export default LayoutWrapper(connect(mapStateToProps, mapDispatchToProps)(MyMusic));
