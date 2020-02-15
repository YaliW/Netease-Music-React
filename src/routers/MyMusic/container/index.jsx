import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { setMyPlayList, setPlayListDetail } from '../store/actions'
import { setPlayingSong, setIsPlay } from '../../../layout/store/actions'
import { fetchMyPlayList, fetchPlayListDetail, fetchSongUrl } from '../service'
import { PlayListDetail, MyPlayList } from '../model/index'

import LeftTitle from '../components/LeftTitle'
import PlayListContent from '../../../components/PlayListContent'
// import AudioPlayer from '../../../components/AudioPlayer'
import LayoutWrapper from '../../../layout/container/index'

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
            };
            fetchPlayListDetail(payload).then((res) => {
                if (res.status === 200 && res.data.code === 200) {

                    const trackIds = res.data.playlist.trackIds.map(item => item.id).join(',');
                    const songUrlParam = {id: trackIds};
                    const playListDetailRes = res.data.playlist;
                    fetchSongUrl(songUrlParam).then((res1) => {
                      if (res1.status === 200 && res1.data.code === 200) {
                        const combineRes = Object.assign({}, playListDetailRes, {songUrlList: res1.data.data});
                        this.props.setPlayListDetail(PlayListDetail.fromJS(combineRes))
                      }
                    })
                }
            });
        }
    }

    handleClick(param) {
        this.setState({
            playListId: param
        }, this.fetchPlayListDetailAsync)
    }

    songProcessTimeChange(time) {
        this.setState({
            songProcessTime: time,
        });
    }
    
    render() {
        const { myPlayList, playListDetail, setPlayingSong, setIsPlay } = this.props;
        const tracks = playListDetail ? playListDetail.tracks : [];
        let selectedTrack = null;
        if (tracks) {
            selectedTrack = tracks[0];
        }
        
        return (
            <div className="my-music-container">
                <LeftTitle className="left-title" data={myPlayList} onChange={this.handleClick.bind(this)}></LeftTitle>
                <PlayListContent key={playListDetail.id} id={playListDetail.id} className="right-content" data={playListDetail} setPlayingSong={setPlayingSong} setIsPlay={setIsPlay}></PlayListContent>
            </div>

            
                // <div className="player">
                //     {/* <Player></Player> */}
                //     <AudioPlayer
                //         lock="true"
                //         selectedTrack={selectedTrack}
                //         // songlist={this.state.songlist}
                //         // handleSelectionChange={this.trackSelectionChange}
                //         // handleSonglistOpenChange={this.toggleSonglistOpen}
                //         handleSongProcessTime={this.songProcessTimeChange}
                //         // handleLockChange={this.togglePlayerLock}
                //     />
                // </div>
           
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
    setPlayingSong,
    setIsPlay,
}

export default LayoutWrapper(connect(mapStateToProps, mapDispatchToProps)(MyMusic));