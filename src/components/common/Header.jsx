import React, {Component} from 'react'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '我的音乐',
            topBar: ['发现音乐', '我的音乐', '朋友', '商城', '音乐人', '下载客户端'],
        }
    }

    render() {
        const itemLists = this.state.topBar.map((item) => {
            return (
                <div className="top-bar-item" key={item}>
                    <em>{item}</em>
                    <sub>&nbsp;</sub>
                </div>
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