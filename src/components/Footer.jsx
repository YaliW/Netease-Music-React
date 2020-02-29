import React, {Component} from 'react'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    title: '用户认证',
                    position: '-63px -101px',
                },
                {
                    title: '独立音乐人',
                    position: '0 0',
                },
                {
                    title: '赞赏',
                    position: '-60px -50px',
                },
                {
                    title: '视频奖励',
                    position: '0 -101px',
                }
            ]
        }
    }
    render() {
        const itemLists = this.state.data.map((item) => {
            const style = {
                backgroundPosition: item.position
            }
            return (
                <div className="list-item" key={item.title}>
                    <div className="icon" style={style} />
                    <div className="title">{item.title}</div>
                </div>
            )
        })
        return (
            <div className="wrapper">
                <div className="footer-container">
                <div className="netease-icon">
                    <span>本项目使用Vue全家桶实现网易云音乐的模仿。
                        <br/>作者王亚丽。仅供学习交流使用。</span>
                </div>

                    <div className="list-container">
                        {itemLists}
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
