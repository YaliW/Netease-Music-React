import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import InputDataBind from '../components/dataBind/InputDataBind';
import A from '../components/dataBind/A';
import '../../../assets/scss/personal/index.scss';
export default class Personal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showComponent: 1,
      }
  }

  render() {
    return (
      <div className="personal-wrapper">
        <div className="header">
          <p>个人功能设计</p>
          <NavLink to='/personal/BrandShowCase' activeClassName="selected" >首屏滚动Banner设计</NavLink>
        </div>
        <div className="content-wrapper">
            <InputDataBind />
            <A />
        </div>
      </div>

    )
  }
}
