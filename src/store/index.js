import { combineReducers } from 'redux' // 合并不同的Reducer
import { createStore } from 'redux'

import homeReducer from '../routers/Home/store/reducer';
import myMusicReducer from '../routers/MyMusic/store/reducer';
import playlistDetailPageReducer from '../routers/PlayListDetailPage/store/reducer';
import layoutReducer from '../layout/store/reducer';

const reducers = combineReducers({
    home: homeReducer,  // 合并reducer 之后对应的state的格式，homeReducer对应的state 要在state.home 中取到
    myMusic: myMusicReducer,
    playlistDetailPage: playlistDetailPageReducer,
    layout: layoutReducer
});

export default createStore(reducers);