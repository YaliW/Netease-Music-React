import { createStore } from 'redux'
import reducer from './reducer'

// store是唯一的
// 只有store才能改变自己的内容（state）
// reducer必须是纯函数
// 把 reducer 放进 createStore 里 创建store

const store = createStore(reducer);
export default store;