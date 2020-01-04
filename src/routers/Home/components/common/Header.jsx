import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const TopBarOptions = {
topBar: [
    { title: '发现音乐', url: '/' }, 
    { title: '我的音乐', url: '/my_music' },
    { title: '朋友', url: '/friends' },
    { title: '商城', url: '/shop' },
    { title: '音乐人', url: '/musician' },
    { title: '下载客户端', url: '/download' }],
};

class Header extends Component {
    render() {
        const itemLists = TopBarOptions.topBar.map((item) => {
            return (
                <Link to={item.url} className="top-bar-item" key={item.title}>
                    <em>{item.title}</em>
                    <sub>&nbsp;</sub>
                </Link>
            )
        });
        return (
            <div className='netease-header'>
                <div className='container'>
                    <div className='icon'></div>
                    <div className="item-list">
                        {itemLists}
                    </div>
                </div>
                <div className="header-bottom"></div>
            </div>
        )
    }
  }

  export default Header;