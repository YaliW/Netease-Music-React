import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        };
    }
    // 当props 发生变化的时候 会执行
    componentWillReceiveProps(nextProps) {
        const { type } = this.props; // ES6 的析构
        if (type !== nextProps.type) {
            this.setState({
                type: nextProps.type
            });
        }
    }

    render() {
        const { type } = this.state;
        const { onChange } = this.props;
        const backgroundPosition = type === 'hot' ? '0 0' : '0 -32px';
        const backgroundPositionStyle = {
            backgroundPosition
        }
        return (
            <div className="category-container">
                <div className="all-category">
                    <div className="all">
                        全部
                    </div>
                </div>
                <div className="hot-new-category" style={backgroundPositionStyle}>
                    <div className={`category-button ${type === 'hot' ? 'active' : ''}`} onClick={() => onChange('hot')}>热门</div>
                    <div className={`category-button ${type === 'new' ? 'active' : ''}`} onClick={() => onChange('new')}>最新</div>
                </div>
            </div>
        )
    }
}

Category.defaultProps = {
    type: 'hot',
    onChange: () => {}
};

Category.propTypes = {
    type: PropTypes.oneOf(['new', 'hot']),
    onChange: PropTypes.func
}

export default Category;
