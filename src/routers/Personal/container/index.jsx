import React, { Component } from 'react';
import InputDataBind from '../components/InputDataBind';
import A from '../components/A';

export default class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <InputDataBind />
                <A />
            </div>
            
        )
    }
}