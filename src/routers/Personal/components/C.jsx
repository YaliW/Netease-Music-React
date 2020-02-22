import React, { Component } from 'react';

export default class C extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // static contextType = InitContext
    render() {
        return (
            <div>name: {this.context}</div>
        )
    }
}