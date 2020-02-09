import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RightSubscribors from '../components/RightSubscribors';
import PlayListContent from '../../../components/PlayListContent';
import LayoutWrapper from '../../../layout/index';
import { setPlayListDetail } from '../store/actions'
import { fetchPlayListDetail } from '../service'
import { PlayListDetail } from '../model/index'

class PlayListDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playListId: null,
        };

        this.fetchPlayListDetailAsync();
    }

    fetchPlayListDetailAsync() {
        const { playListId } = this.state;
        // if (playListId) {
            const payload = {
                // id: playListId
                id: 986184445
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
        const { playListDetail } = this.props;
        console.log(this.props, 'props');
        return (
            <div className="playlist-detail-container">
                <PlayListContent className="left" data={playListDetail}></PlayListContent>
                <RightSubscribors className="right"></RightSubscribors>
            </div>
        );
    }
}

PlayListDetailPage.propTypes = {
    playListDetail: PropTypes.object.isRequired,
    setPlayListDetail: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    playListDetail: state.playlistDetailPage.playListDetail,
});

const mapDispatchToProps = {
    setPlayListDetail,
}

export default LayoutWrapper(connect(mapStateToProps, mapDispatchToProps)(PlayListDetailPage));