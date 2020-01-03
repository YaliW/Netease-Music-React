import React, {Component} from 'react'
import store from '../store/index'
import Header from './common/Header'
import Footer from './common/Footer'
import Player from './common/Player'
import PlayList from './PlayList'
import Category from './Category'
import { CHANGE_VALUE } from '../store/actionTypes'

class Home extends Component {
    constructor(props) {
        super(props) 
        this.state = store.getState();
        store.subscribe(this.StoreChange)
    }
    
    componentDidMount() {
        console.log(this.state.value, 'mount');
    }

    render() {
        return (
            <div className='netease-layout'>
        
                <div className='header' onClick={this.changeVal}> 
                    <Header></Header>
                </div>

                <section>
                    <div className="playlist-container">
                        <Category></Category>
                        <PlayList></PlayList>
                    </div>
                </section>
                <div className='footer' onClick={this.checkVal.bind(this)}>   
                    <Footer></Footer>
                </div>
                <div className="player">
                    <Player></Player>
                </div>
            </div>
        )
    }
    changeVal() {
        const action = {
            type: CHANGE_VALUE,
            value: 'test change val'
        }
        store.dispatch(action);
    }
    StoreChange = () => {
        this.setState(store.getState());
    }
    checkVal() {
        console.log(this.state.value, 'after change');
    }
}

export default Home;