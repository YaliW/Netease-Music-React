import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"; // react-router-dom 是把路由放在了视图层DOM上，也可以使用react-router, 对路由进行配置，两个库均可配置路由
import React, { Component } from 'react';


import MyMusic from './MyMusic/container';
import Home from './Home/container';
import Friends from './Friends/container';

class Layout extends Component {
    render () {
        return (
          <Router>
            <Switch>
                {/* exact 匹配整个url */}
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/my_music">
                    <MyMusic />
                </Route>
                <Route path="/friends">
                    <Friends />
                </Route>
                <Route path="/shop">
                    <Friends />
                </Route>
                <Route path="/musician">
                    <Friends />
                </Route>
                <Route path="/download">
                    <Friends />
                </Route>
            </Switch>
          </Router>
        );
    }
}

// Layout 是最外层APP， 可以配置路由，给组件配置相应的路由，在外层的index.js 中，通过ReactDOM.render() 进行渲染
export default Layout;