import { CHANGE_VALUE } from './actionTypes'

// 初始 state
const initState = {
    value: 'init value'
};

// reducer可以接收state，但是绝不能修改state
// reducer必须是纯函数
// 纯函数：给固定的输入，一定有固定的输出（不能有不固定的日期函数），不会有副作用（改变参数的值）
export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_VALUE:  // 根据不同的 action type， 调用不同的 action 做不同的处理
            const newState = JSON.parse(JSON.stringify(state));  // 简单的深拷贝
            newState.value = action.value;
            console.log(newState.value, 'reducer');
            
            return newState;

        default:
            return state;
    }
}