import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LayoutWrapper from '../../../layout/index';

class PlayListDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className ="playlist-detail-container">
                fefefe
            </div>
        )
    }
}

PlayListDetail.propTypes = {

}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {

}

export default LayoutWrapper(connect(mapStateToProps, mapDispatchToProps)(PlayListDetail));