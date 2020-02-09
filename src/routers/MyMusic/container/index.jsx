import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { setMyPlayList, setPlayListDetail } from '../store/actions'
import { fetchMyPlayList, fetchPlayListDetail } from '../service'
import { PlayListDetail, MyPlayList } from '../model/index'

import LeftTitle from '../components/LeftTitle'
import PlayListContent from '../../../components/PlayListContent'
// import AudioPlayer from '../../../components/AudioPlayer'
import LayoutWrapper from '../../../layout/index'

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

    songProcessTimeChange(time) {
        this.setState({
            songProcessTime: time,
        });
    }
    
    render() {
        const { myPlayList, playListDetail } = this.props;
        const tracks = playListDetail ? playListDetail.tracks : [];
        let selectedTrack = null;
        if (tracks) {
            selectedTrack = tracks[0];
        }
        
        return (
            <div className="my-music-container">
                <LeftTitle className="left-title" data={myPlayList} onChange={this.handleClick.bind(this)}></LeftTitle>
                <PlayListContent key={playListDetail.id} id={playListDetail.id} className="right-content" data={playListDetail}></PlayListContent>
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
}

export default LayoutWrapper(connect(mapStateToProps, mapDispatchToProps)(MyMusic));