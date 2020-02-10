import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class RightSubscribors extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { data, className } = this.props;
        let row = null;
        if (data) {
            const localData = data.reduce((prev, curr, index) => {
                if (index % 4 === 0) {
                    prev.push([curr])
                } else {
                    const temp = prev.pop();
                    temp.push(curr);
                    prev.push(temp);
                }
                return prev;
            }, []);
        
            row = localData.map((item, index) => {
                const col = item.map((subItem, subIndex) => {
                    return (
                        <div className="column" key={subIndex}>
                            <img src={subItem} alt="" />
                        </div>
                    )
                });
                return (
                    <div className="row" key={index}>
                        {col}
                    </div>
                )
            })
        }
        return (
            <div className={classnames('right-subscribors-container', className)}>
                <div className="title">喜欢这个歌单的人</div>
                <div className="content-list">
                    {row}
                </div>
            </div>
        )
    }
}

RightSubscribors.propTypes = {
    subscribors: PropTypes.array,
}

export default RightSubscribors;