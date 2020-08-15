import React, { Component } from 'react';
import C from './C'

export default class B extends Component {
    render() {
        const { messageFromA } = this.props;
        return (
            <div>Component B
                {messageFromA}
                <button onClick={this.change.bind(this)}>Change A</button>
                <C />
            </div>
        )
    }

    change() {
        const { changeAFromB } = this.props;
        changeAFromB('change A from B')
    }
}
