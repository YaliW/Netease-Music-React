import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Player from '../components/Player';

export default function Wrapper(WrapperComponent) {
    class Layout extends Component {
        render() {
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
                <div className="player">
                    <Player></Player>
                </div>
            </div>;
        }
    };

    const mapStateToProps = (state) => {
        return state.layout || {};
    };
    const mapDispatchToProps = {};
    return connect(mapStateToProps, mapDispatchToProps)(Layout);
};