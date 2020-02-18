import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

const TopBarOptions = {
topBar: [
    { title: '发现音乐', url: '/' }, 
    { title: '我的音乐', url: '/my_music' },
    { title: '朋友', url: '/friends' },
    { title: '商城', url: '/shop' },
    { title: '音乐人', url: '/musician' },
    { title: '下载客户端', url: '/download' }],
};

// 组件名称必须以大写字母开头
class Header extends Component {
    render() {
        const itemLists = TopBarOptions.topBar.map((item) => {
            // const isActive 
            return (
                // NavLink 当在当前url时，activeClassName 会生效
                <NavLink isActive={(match, location) => {
                    let regex = /playlistDetail/;
                    if (item.url === '/' && regex.test(location.pathname)) {
                        return true;
                    } else {
                        if (!match) {
                            return false;
                        } else {
                            return match.isExact;
                        }
                    }
                    }} to={item.url} activeClassName="selected" className="top-bar-item" key={item.title}>
                    <em>{item.title}</em>
                    <sub>&nbsp;</sub>
                </NavLink>
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

// Header 是公共头组件，每个路由的组件都会显示，当点击头的时候，会跳转到相应的路由，然后根据外层 index.js 中路由的配置，再跳转到相应的组件
export default Header;