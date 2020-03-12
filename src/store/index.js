import { combineReducers, applyMiddleware } from 'redux' // 合并不同的Reducer
import { createStore } from 'redux'
import thunk from 'redux-thunk';

import homeReducer from '../routers/Home/store/reducer';
import myMusicReducer from '../routers/MyMusic/store/reducer';
import playlistDetailPageReducer from '../routers/PlayListDetailPage/store/reducer';
import layoutReducer from '../layout/store/reducer';

const reducers = combineReducers({
    home: homeReducer, // 合并reducer 之后对应的state的格式，homeReducer对应的state 要在state.home 中取到
    myMusic: myMusicReducer,
    playlistDetailPage: playlistDetailPageReducer,
    layout: layoutReducer
});

// reducers 是 对象
// applyMiddleware 是函数，先执行, 洋葱模型，如果有多个 中间件，会逐层执行 A B C -> A(B(C))
// applyMiddleware 内部会封装 dispatch，connect 后期调用的 dispatch 是middleware 封装后的 dispatch
// applyMiddleware 内部 会创建Store， 做一些封装，然后返回
// 然后 reducers, applyMiddleware 返回的半个 Store 作为 createStore 的参数，创建 Store
export default createStore(reducers, applyMiddleware(thunk));
