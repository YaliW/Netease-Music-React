import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // react-redux 用于连接 react 和 redux

import './assets/scss/index.scss';
import APP from './routers';
import store from './store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <APP />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
