import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';

// 函数组件 没有this， 没有生命周期，没有state
// 轻量，用于只渲染数据，性能较好
function Category(props) {
    const [type, setType] = useState(props.type);

    // 在 componentDidMount, componentDidUpdate 渲染结束之后执行
    // 相当于 Vue 中的watch，当第二个参数变化时，才执行
    useEffect(() => {
        setType(props.type)
    }, [props.type])
    
    const { onChange } = props;
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
};

Category.defaultProps = {
    type: 'hot',
    onChange: () => {}
};

Category.propTypes = {
    type: PropTypes.oneOf(['new', 'hot']),
    onChange: PropTypes.func
};

export default Category;
