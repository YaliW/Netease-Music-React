import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // react-redux 用于连接 react 和 redux

import './assets/scss/index.scss';  // 导入CSS
import APP from './routers';  // 导入 React 组件APP
import store from './store';  // 导入 Store
import * as serviceWorker from './serviceWorker';

// 将一个 React 元素渲染到根 DOM 节点中.
// 在实践中，大多数 React 应用只会调用一次 ReactDOM.render(). React DOM 只会更新需要更新的内容
// render方法有三个参数，第一个就是React 元素，第二个是根 DOM 节点，第三个是callback，将会在整个应用render之后进行调用。
ReactDOM.render(
    <Provider store={store}>
        <APP />
    </Provider>,
    document.getElementById('root')
);

//

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// 可以获取缓存的一种方式
serviceWorker.unregister();
