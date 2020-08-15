import React, { Component } from 'react';
// import InputDataBind from '../components/dataBind/InputDataBind';
// import A from '../components/dataBind/A';
import BrandShowcase from '../components/BrandShowcase/container';
import '../../../assets/scss/personal/index.scss';
export default class Personal extends Component {
  constructor(props) {
      super(props);
      this.state = {

      }
  }

  render() {
    return (
      <div className="personal-wrapper">
        {/* <div className="content-wrapper">
            <InputDataBind />
            <A />
        </div> */}

        <div className="content-wrapper">
          <BrandShowcase />
        </div>

      </div>

    )
  }
}
