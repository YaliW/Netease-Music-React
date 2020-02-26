import React, { Component } from 'react';
import { ThemeContext } from './Context';

export default class C extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // 初始化 contextType
    // static contextType = ThemeContext

    render() {
        console.log(this.context, 'context'); 
        const {messageFromA, troggle} = this.context;
        return (
            <div onClick={troggle}>name: {messageFromA}</div>
        )
    }
}
// 二：初始化 contextType
C.contextType = ThemeContext
