import React, { Component } from 'react';
import B from './B';
import { ThemeContext } from './Context';

// 创建一个Context对象
export default class A extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageFromA: 'message from A',
            message: 'message',
            troggle: () => {console.log('troggle context')}
        }
    }

    render() {
        const { messageFromA, message } = this.state;
        return (
            // 使用一个 Provider 来将当前的 context 传递给以下的组件树，value 就是context 的值
            <ThemeContext.Provider value={this.state}>
                <div>Component A
                    {message}
                    <B messageFromA={messageFromA} changeAFromB={this.change.bind(this)}/>
                </div>
            </ThemeContext.Provider>
        )
    }

    change(param) {
        this.setState({
            message: param
        })
    }
}