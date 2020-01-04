import React, {Component} from 'react'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStyle: 'hot'
        }
    }
    swapHotNewCategory(value) {
        this.setState({  // setState 不会马上更新， 相当于异步更新，会等会一起更新所有的setState
            selectedStyle: value
        })
    }
    render() {
        let backgroundPosition = this.state.selectedStyle === 'hot' ? '0 0' : '0 -32px';
        let backgroundPositionStyle = {
            backgroundPosition: backgroundPosition
        }
        return (
            <div className="category-container">
                <div className="all-category">
                    <div className="all">
                        全部
                    </div>
                </div>
                <div className="hot-new-category" style={backgroundPositionStyle}>
                    <div className={`category-button ${this.state.selectedStyle === 'hot' ? 'active' : ''}`} onClick={() => this.swapHotNewCategory('hot')}>热门</div>
                    <div className={`category-button ${this.state.selectedStyle === 'new' ? 'active' : ''}`} onClick={() => this.swapHotNewCategory('new')}>最新</div>
                </div>
            </div>
        )
    }
}

export default Category;