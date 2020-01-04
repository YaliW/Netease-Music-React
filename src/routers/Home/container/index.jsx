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
        fetchPlayList({ offset: 0, limit: 10  }).then((res) => {
            console.log(res, 'res');
            if (res.status === 200 && res.data.code === 200) {
                props.setPlayList(TopPlayList.fromJS(res.data.playlists));
            }
        })
        // this.state = store.getState();
        // this.StoreChange = this.StoreChange.bind(this);
        // store.subscribe(this.StoreChange)
    }
    
    componentDidMount() {
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
    changeVal() {
        // const action = {
        //     type: CHANGE_VALUE,
        //     value: 'test change val'
        // }
        // store.dispatch(action);
    }
    StoreChange() {
        // this.setState(store.getState());
    }
    checkVal() {
        console.log(this.state.value, 'after change');
    }
}

Home.propTypes = {
    playList: PropTypes.array.isRequired,
    setPlayList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    playList: state.playList
});

const mapDispatchToProps = {
    setPlayList
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);