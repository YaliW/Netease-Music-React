import React, { Component } from 'react';
import B from './B';

// 创建一个Context对象
const InitContext = React.createContext()
export default class A extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageFromA: 'message from A',
            message: 'message'
        }
    }

    render() {
        const { messageFromA, message } = this.state;
        return (
            // 使用一个 Provider 来将当前的 context 传递给以下的组件树
            <InitContext.Provider value='tadpole'>
                <div>Component A
                    {message}
                    <B messageFromA={messageFromA} changeAFromB={this.change.bind(this)}/>
                </div>
            </InitContext.Provider>
        )
    }

    change(param) {
        this.setState({
            message: param
        })
    }
}