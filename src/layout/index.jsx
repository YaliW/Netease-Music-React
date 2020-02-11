import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Player from '../components/Player';

export default function Wrapper(WrapperComponent) {
    class Layout extends Component {
        constructor(props) {
            super(props);
            this.state = {
                autovisible: false, // 控制 lock，默认unlock
                footerVisible: false,  // 控制是否显示播放器，默认隐藏
            }
        }

        render() {
            const { footerVisible, autovisible } = this.state;
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
                            <Player></Player>
                        </div>
                    </div>
                </div>
            </div>;
        }

        handleMouseEnter(event) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                footerVisible: true
            })
            console.log(this.footerVisible, event);
        }

        handleMouseLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                footerVisible: false
            })
        }

        handleLock(event) {
            event.preventDefault(); 
            this.setState({
                autovisible: !this.state.autovisible,
                footerVisible: true,
            })
        }
    };

    const mapStateToProps = (state) => {
        return state.layout || {};
    };
    const mapDispatchToProps = {};
    return connect(mapStateToProps, mapDispatchToProps)(Layout);
};