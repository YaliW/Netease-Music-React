import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPlayList, setTotalPlay } from '../store/actions';
import { TopPlayList } from '../model';
import { fetchPlayList } from '../service';

import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Player from '../../common/Player'
import PlayList from '../components/PlayList'
import Category from '../components/Category'
import Paging from '../components/Paging'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'hot'
        };
        this.fetchPlayListAsync();
        // 调用异步请求，拿到结果之后，调用setPlayList
        
    }

    fetchPlayListAsync() {
        const payload = {
            offset: 0, 
            limit: 10,
            order: this.state.order
        }
        fetchPlayList(payload).then((res) => {
            if (res.status === 200 && res.data.code === 200) {
                this.props.setPlayList(TopPlayList.fromJS(res.data.playlists));
                this.props.setTotalPlay(res.data.total);
            }
        })
    }

    handleClick(param) {
        this.setState({
            order: param
        },
        this.fetchPlayListAsync)  // this.fetchPlayListAsync 是一个函数，作为callback. 如果this.fetchPlayListAsync（） 则是会立刻执行这个函数，把结果null 作为callback
    }

    render() {
        const { playList, totalPlay } = this.props;
        const { order } = this.state;
        return (
            <div className='netease-layout'>
        
                <div className='header'> 
                    <Header></Header>
                </div>

                <section>
                    <div className="playlist-container">
                        <Category type={order} onChange={this.handleClick.bind(this)}></Category>
                        <PlayList data={playList}></PlayList>
                        <Paging data={totalPlay} onChange={this.clickPage.bind(this)}></Paging>
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

    clickPage(param) {
        this.setState({
            offset: param,
        }, this.fetchPlayListAsync)
    }
}

// PropTypes 用于判断类型，方便错误排查
Home.propTypes = {
    playList: PropTypes.array.isRequired,
    totalPlay: PropTypes.number.isRequired,
    setPlayList: PropTypes.func.isRequired,
    setTotalPlay: PropTypes.func.isRequired,
};

// 把 Store 中state 定义的变量 map 到 React 组件的 props 中，在 React 组件中可以直接 props.*** 使用，并且是响应式数据，会随着state 中数据的变化而实时更新
// 类似于 Vue 中的 mapState
// 每次Store 中state 有变化的时候，就会自动调用更新state，会接收整个state 的数据
const mapStateToProps = (state) => ({
    playList: state.home.playList,
    totalPlay: state.home.totalPlay,
});

// 把 Store 中定义的函数action map 到 React组件的props中，在React组件中可以直接使用 props.*** 使用
// action 中定义了 TYPE 和 需要更改的state中的变量新的值，调用Reducer 更改 state 的值
// 调用流程为 首先引入 setPlayList，然后在 mapDispatchToProps 中把此方法 map给组件的props，然后在组件中使用props.*** 调用此函数
// 如果参数是一个 function， 当组件创建的时候，会自动调用
// 如果参数是一个 object, 会封装成一个props 中的function，调用的时候自动 dispatch
const mapDispatchToProps = {
    setPlayList,
    setTotalPlay
};

// connect 是高阶组件
export default connect(mapStateToProps, mapDispatchToProps)(Home);