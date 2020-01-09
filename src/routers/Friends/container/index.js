import React from 'react';

import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Player from '../../common/Player'

class Friends extends React.Component {
    
    render() {
        return (
            <div className='netease-layout'>
        
                <div className='header'> 
                    <Header></Header>
                </div>

                <section>
                    <div className="my-playlist-container">
                        Under Development
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

export default Friends;