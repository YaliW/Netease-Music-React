import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { setMyPlayList, setPlayListDetail } from '../store/actions'
import { fetchMyPlayList, fetchPlayListDetail } from '../service'
import { PlayListDetail, MyPlayList } from '../model/index'

import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Player from '../../common/Player'
import LeftTitle from '../components/LeftTitle'
import RightContent from '../components/RightContent'

class MyMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playListId: null
        };

        const payload = {
            uid: 1832132513
        };
        fetchMyPlayList(payload).then((res) => {
            const { playlist } = res.data;
            if (res.status === 200 && res.data.code === 200) {
                this.props.setMyPlayList(MyPlayList.fromJS(playlist));

                this.setState({
                    playListId: playlist.length > 0 ? playlist[0].id : null
                }, this.fetchPlayListDetailAsync)
            }
        })
    }
    fetchPlayListDetailAsync() {
        const { playListId } = this.state;
        if (playListId) {
            const payload = {
                id: playListId
                // id: 986184445
            };
            fetchPlayListDetail(payload).then((res) => {
                if (res.status === 200 && res.data.code === 200) {
                    const { playlist } = res.data;
                    this.props.setPlayListDetail(PlayListDetail.fromJS(playlist))
                }
            });
        }
    }

    handleClick(param) {
        this.setState({
            playListId: param
        }, this.fetchPlayListDetailAsync)
    }
    
    render() {
        const { myPlayList, playListDetail } = this.props;
        return (
            <div className='netease-layout'>
        
                <div className='header'> 
                    <Header></Header>
                </div>

                <section>
                    <div className="my-playlist-container">
                        <LeftTitle className="left-title" data={myPlayList} onChange={this.handleClick.bind(this)}></LeftTitle>
                        <RightContent className="right-content" data={playListDetail}></RightContent>
                    </div>
                </section>
                <div className='footer'>   
                    <Footer></Footer>
                </div>
                <div className="player">
                    <Player></Player>
                </div>
            </div>
        );
    }
}

MyMusic.propTypes = {
    myPlayList: PropTypes.array.isRequired,
    setMyPlayList: PropTypes.func.isRequired,
    playListDetail: PropTypes.object.isRequired,
    setPlayListDetail: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    myPlayList: state.myMusic.myPlayList,
    playListDetail: state.myMusic.playListDetail,
});

const mapDispatchToProps = {
    setMyPlayList,
    setPlayListDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusic);