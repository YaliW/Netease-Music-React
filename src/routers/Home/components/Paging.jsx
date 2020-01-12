import React, {Component} from 'react'

class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 35,
            offset: 0,
            currPage: 1,
            totalPlay: props.data,
        }
    }

    get totalPages() {
        const {totalPlay, limit} = this.state;
        return Math.ceil(totalPlay / limit);
    }

    get leftEllipsis() {
        return this.state.currPage > 4;
    }

    get rightEllipsis() {
        const {totalPlay, limit, currPage} = this.state;
        return Math.ceil(totalPlay / limit) - currPage > 4;
    }

    get centerArr() {
        const {totalPlay, limit, currPage} = this.state;
        
        const result = [];
        const left = currPage > 5 ? (this.totalPages < currPage + 4 ? Math.ceil(totalPlay / limit) - 7 : currPage - 3) : 2;
        const isEnough = Math.ceil(totalPlay / limit) > currPage + 3; const right = isEnough ? Math.max(currPage + 3, left + 6) : Math.ceil(totalPlay / limit) - 1;
        for (let index = left; index <= right; index++) {
            result.push(index); 
        }
        return result; 
    }

    render() {
        const {currPage} = this.state;
        let leftEllipsisDom = null;
        if (this.leftEllipsis) {
            leftEllipsisDom = <span>...</span>
        }
        const centerArrDom = this.centerArr.map((item) => {
            return (
                <span key="item">
                    <a href="/" className={`num-page ${currPage === item ? 'curr-page' : ''}`} onClick={() => this.clickPage(item)}>{item}</a >
                </span>
            )
        })
        let rightEllipsisDom = null;
        if (this.rightEllipsis) {
            rightEllipsisDom = <span>...</span>
        }
        return (
            <div className="paging-wrapper">
                <div className="paging-container">
                    <span className={`page prev-page ${currPage === 1 ? 'grey-prev-page' : ''}`} onClick={() => this.clickPrevPage()}>上一页</span >
                    <span className={`num-page ${currPage === 1 ? 'curr-page' : ''}`} onClick={() => this.clickPage(1)}>1</span>
                    {leftEllipsisDom}
                    {centerArrDom}
                    {rightEllipsisDom}
                    <span className={`num-page ${currPage === this.totalPages ? 'curr-page' : ''}`} onClick={() => this.clickPage(this.totalPages)}>{this.totalPages}</span >
                    <span className={`page next-page ${currPage === this.totalPages ? 'grey-next-page' : ''}`} onClick={() => this.clickNextPage()}>下一页</span > 
                </div>
            </div> 
        )
    }

    clickPage(page) {
        const {limit } = this.state;
        this.setState({
            currPage: page,
            offset: limit * (page - 1)
        }, this.handleClick);
        // this.$emit('clickPage', {value: this.offset});
    }
    clickPrevPage() {
        const {limit, currPage} = this.state;
        if (currPage > 1) {
            this.setState({
                currPage: currPage - 1,
                offset: limit * (currPage - 2)
            }, this.handleClick)
            // this.$emit('clickPage', {value: this.offset});
        }
        
    }
    clickNextPage() {
        const {totalPlay, limit, currPage} = this.state;
        if (currPage < Math.ceil(totalPlay / limit)) {
            this.setState({
                currPage: currPage + 1,
                offset: limit * (currPage)
            }, this.handleClick)
            // this.$emit('clickPage', {value: this.offset});
        }
        
    }

    handleClick() {
        this.props.onChange(this.state.offset);
    }
}

export default Paging;