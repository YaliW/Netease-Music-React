import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RightSubscribers from '../components/RightSubscribers';
import PlayListContent from '../../../components/PlayListContent';
import LayoutWrapper from '../../../layout/index';
import { setPlayListDetail } from '../store/actions'
import { fetchPlayListDetail } from '../service'
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
        // if (playListId) {
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
        // }
    }

    render() {
        const { playListDetail, subscribers } = this.props;
        return (
            <div className="playlist-detail-container">
                <PlayListContent className="left" data={playListDetail} key={playListDetail.id}></PlayListContent>
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
}

export default LayoutWrapper(connect(mapStateToProps, mapDispatchToProps)(PlayListDetailPage));