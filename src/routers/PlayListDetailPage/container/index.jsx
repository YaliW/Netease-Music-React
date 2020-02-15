import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RightSubscribers from '../components/RightSubscribers';
import PlayListContent from '../../../components/PlayListContent';
import LayoutWrapper from '../../../layout/container/index';
import { setPlayListDetail } from '../store/actions'
import { setPlayingSong, setIsPlay } from '../../../layout/store/actions'
import { fetchPlayListDetail, fetchSongUrl } from '../service'
import { PlayListDetail } from '../model/index'

class PlayListDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playListId: window.location.pathname.split('/')[2],
        };
        this.fetchPlayListDetailAsync();
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

    render() {
        const { playListDetail, subscribers, setPlayingSong, setIsPlay } = this.props;
        return (
            <div className="playlist-detail-container">
                <PlayListContent className="left" data={playListDetail} key={playListDetail.id} setPlayingSong={setPlayingSong} setIsPlay={setIsPlay}></PlayListContent>
                <RightSubscribers className="right" data={subscribers}></RightSubscribers>
            </div>
        );
    }
}

PlayListDetailPage.propTypes = {
    playListDetail: PropTypes.object.isRequired,
    setPlayListDetail: PropTypes.func.isRequired,
    subscribers: PropTypes.array,
}

const mapStateToProps = (state) => ({
    playListDetail: state.playlistDetailPage.playListDetail,
    subscribers: state.playlistDetailPage.playListDetail.subscribers,
});

const mapDispatchToProps = {
    setPlayListDetail,
    setPlayingSong,
    setIsPlay,
}

export default LayoutWrapper(connect(mapStateToProps, mapDispatchToProps)(PlayListDetailPage));