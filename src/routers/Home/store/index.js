import { createStore } from 'redux'
import reducer from './reducer'

// store是唯一的
// 只有store才能改变自己的内容（state）
// reducer必须是纯函数
// 把 reducer 放进 createStore 里 创建store

// 为了方便维护代码和代码分割，每个模块有自己相应的store, 然后这些Store 可以在外层的Store 中被应用
const store = createStore(reducer);
export default store;