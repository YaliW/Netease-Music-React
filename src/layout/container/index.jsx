import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Player from '../../components/Player';
import SongListPanel from '../../components/SongListPanel';
import { setIsPlay, setPlayingSong, setLyric } from '../store/actions';
import { fetchLyric } from '../service';

export default function Wrapper(WrapperComponent) {
    class Layout extends Component {
        constructor(props) {
            super(props);
            this.state = {
                autovisible: false, // 控制 lock，默认unlock
                footerVisible: false,  // 控制是否显示播放器，默认隐藏
                animationState: false,  // 控制动画，当前动画完成后，才会执行新的动画
                showSongList: false,  // 控制播放列表的展示
            }
        }

        componentWillReceiveProps(nextProps) {
            const { playingSong } = this.props;
            const newId = nextProps.playingSong.id;
            if (playingSong.id !== newId) {
                this.fetchLyricAsync(newId);
            }
        }

        fetchLyricAsync(id) {
            const { setLyric } = this.props;
            fetchLyric({id:id}).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    const value = res.data.lrc ? res.data.lrc.lyric : '';
                    const lyric = value.split(/\r?\n/).map(item => {
                        const index = item.indexOf(']');
                        const timeArr = item.slice(1, index).split(':');
                        const time = timeArr.length === 2 ? timeArr[0]*60 + Math.floor(timeArr[1]) : 0;
                        const content = item.slice(index + 1);
                        return {
                            time,
                            content,
                        };
                    });
                    setLyric(lyric);
                }
            })
        }

        render() {
            const { footerVisible, autovisible, showSongList } = this.state;
            const { playingSong, isPlay, setIsPlay, setPlayingSong, lyric } = this.props;
            let songListComponent = null;
            if (showSongList) {
                songListComponent = (
                    <div className="song-list">
                        <SongListPanel lyric={lyric} playingSong={playingSong} setPlayingSong={setPlayingSong} onChange={this.closeSongListPanel.bind(this)}></SongListPanel>
                    </div>
                )
            }
            return <div className='netease-layout'>
                <div className='header'>
                    <Header></Header>
                </div>
                <section>
                    {<WrapperComponent />}
                </section>
                <div className='footer'>
                    <Footer></Footer>
                </div>
                <div className="footer-auto-visible">
                    <div className={classnames("player-footer-container", (footerVisible ? "visible" : ""))} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                        <div className="updn">
                            <div className={classnames("icon", (autovisible ? "lock" : ""))} onClick={this.handleLock.bind(this)}></div>
                        </div>
                        <div className="updn-right"></div>
                        <div className="bg" title="背景"></div>
                        <div className="hand" title="展开播放器"></div>
                        <div className="player">
                            <Player playingSong={playingSong} isPlay={isPlay} setIsPlay={setIsPlay} onChange={this.clickShowSongList.bind(this)}></Player>
                        </div>
                    </div>
                    {songListComponent}
                </div>
            </div>
        }

        handleMouseEnter(event) {
            event.preventDefault();
            event.stopPropagation();
            const { footerVisible, autovisible, animationState } = this.state;
            if (!footerVisible && !autovisible && !animationState) {
                this.setState({
                    footerVisible: true,
                    animationState: true,
                });
                setTimeout(() => {
                    this.setState({
                        animationState: false,
                    })
                }, 400)
            }
        }

        handleMouseLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            const { footerVisible, autovisible, animationState, showSongList } = this.state; 
            if (footerVisible && !autovisible && !animationState && !showSongList) {
                this.setState({
                    footerVisible: false,
                    animationState: true,
                });
                setTimeout(() => {
                    this.setState({
                        animationState: false
                    })
                })
            }
            
        }

        handleLock(event) {
            event.preventDefault(); 
            this.setState({
                autovisible: !this.state.autovisible,
                footerVisible: true,
            })
        }

        clickShowSongList() {
            const { showSongList } = this.state;
            this.setState({
                showSongList: !showSongList,
                footerVisible: true,
            });
        }

        closeSongListPanel() {
            this.setState({
                showSongList: false,
            });
            const { footerVisible, autovisible } = this.state;
            if (footerVisible && !autovisible) {
                this.setState({
                    footerVisible: false,
                })
            }
        }
    };

    const mapStateToProps = (state) => ({
        isPlay: state.layout.isPlay,
        playingSong: state.layout.playingSong,
        lyric: state.layout.lyric,
    })
    const mapDispatchToProps = {
        setIsPlay,
        setPlayingSong,
        setLyric,
    };
    return connect(mapStateToProps, mapDispatchToProps)(Layout);
};