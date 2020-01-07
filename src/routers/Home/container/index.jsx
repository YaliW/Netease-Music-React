import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPlayList } from '../store/actions';
import { TopPlayList } from '../model';
import { fetchPlayList } from '../service';

import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Player from '../components/common/Player'
import PlayList from '../components/PlayList'
import Category from '../components/Category'

class Home extends Component {
    constructor(props) {
        super(props)
        // 调用异步请求，拿到结果之后，调用setPlayList
        fetchPlayList({ offset: 0, limit: 10  }).then((res) => {
            console.log(res, 'res');
            if (res.status === 200 && res.data.code === 200) {
                props.setPlayList(TopPlayList.fromJS(res.data.playlists));
            }
        })
    }

    render() {
        const { playList } = this.props;
        console.log(playList, 'playList');
        return (
            <div className='netease-layout'>
        
                <div className='header'> 
                    <Header></Header>
                </div>

                <section>
                    <div className="playlist-container">
                        <Category></Category>
                        <PlayList data={playList}></PlayList>
                    </div>
                </section>
                <div className='footer'>   
                    <Footer></Footer>
                </div>
                <div className="player">
                    <Player></Player>
                </div>
            </div>
        )
    }
}

// PropTypes 用于判断类型，方便错误排查
Home.propTypes = {
    playList: PropTypes.array.isRequired,
    setPlayList: PropTypes.func.isRequired
};

// 把 Store 中state 定义的变量 map 到 React 组件的 props 中，在 React 组件中可以直接 props.*** 使用，并且是响应式数据，会随着state 中数据的变化而实时更新
// 类似于 Vue 中的 mapState
const mapStateToProps = (state) => ({
    playList: state.home.playList
});

// 把 Store 中定义的函数action map 到 React组件的props中，在React组件中可以直接使用 props.*** 使用
// action 中定义了 TYPE 和 需要更改的state中的变量新的值，调用Reducer 更改 state 的值
const mapDispatchToProps = {
    setPlayList
};

// connect 是高阶组件
export default connect(mapStateToProps, mapDispatchToProps)(Home);