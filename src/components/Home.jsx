import React, {Component} from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import Player from './common/Player'
import PlayList from './PlayList'
import Category from './Category'

class Home extends Component {
    render() {
        return (
            <div className='netease-layout'>
        
                <div className='header'> 
                    <Header></Header>
                </div>

                <section>
                    <div className="playlist-container">
                        <Category></Category>
                        <PlayList></PlayList>
                    </div>
                </section>
                <div className='footer'>   
                    <Footer></Footer>
                </div>
                <div className="player">
                    <Player></Player>
                </div>
            </div>
        )
    }
}

export default Home;