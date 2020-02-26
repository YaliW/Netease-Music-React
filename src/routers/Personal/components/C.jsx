import React, { Component } from 'react';
import { ThemeContext } from './Context';

export default class C extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // 导入 ThemeContext
    static contextType = ThemeContext
    render() {
        console.log(this.context, 'context'); 
        return (
            <div>name: {JSON.stringify(this.context)}</div>
        )
    }
}