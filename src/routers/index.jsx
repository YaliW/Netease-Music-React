import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import React, { Component } from 'react';


import MyMusic from './MyMusic/container';
import Home from './Home/container';

class Layout extends Component {
    render () {
        return (
          <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/my_music">
                    <MyMusic />
                </Route>
            </Switch>
          </Router>
        );
    }
}

export default Layout;