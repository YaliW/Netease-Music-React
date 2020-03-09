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

export default LayoutWrapper(connect(mapStateToProps, mapDispatchToProps)(MyMusic));
