import produce from 'immer';  // 使用 immer 库里的 produce 函数实现state的深拷贝，并且更改state中的值，返回更改后的state

import { SET_MY_PLAY_LIST, SET_PLAY_LIST_DETAIL } from './actionTypes'
// 初始 state
const initState = {
    myPlayList: [],
    playListDetail: {},
};

// reducer必须是纯函数
// 纯函数：给固定的输入，一定有固定的输出（不能有不固定的日期函数），不会有副作用（改变参数的值）
// reducer 中不能做异步处理，因为Reducer 并不会等待异步请求返回的结果
// Reducer 会接受异步请求已经返回的结果，然后深拷贝state，改变新的 state，旧的state并不会改变

// 接收 connect dispatch 过来的 action，执行 Reducer 更新 state
export default (state = initState, action) => {

    switch (action.type) {

        case SET_MY_PLAY_LIST:
            return produce(state, nextState => {  // produce 实现深拷贝，也可以使用JSON.parse(JSON.stringfy(***))
                nextState.myPlayList = action.payload;
            });

        case SET_PLAY_LIST_DETAIL:
            return produce(state, nextState => {  // produce 实现深拷贝，也可以使用JSON.parse(JSON.stringfy(***))
                nextState.playListDetail = action.payload
            });

        default:
            return state;
    }
}
