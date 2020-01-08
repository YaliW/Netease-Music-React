import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // react-redux 用于连接 react 和 redux

import './assets/scss/index.scss';
import APP from './routers';
import store from './store';
import * as serviceWorker from './serviceWorker';

// render方法有三个参数，第一个就是我们的应用，第二个是应用要挂在的根节点，第三个是callback，将会在整个应用render之后进行调用。
ReactDOM.render(
    <Provider store={store}>
        <APP />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// 可以获取缓存的一种方式
serviceWorker.unregister();
