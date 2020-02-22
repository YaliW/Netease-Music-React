import React, { Component } from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

class Lyric extends Component {
    constructor(props) {
        super(props);
        // this.lyricLineRef = React.createRef();
        this.state = {
            indexLine: 0,
        }
        // this.indexLine = 0;
        
    }

    componentWillReceiveProps(nextProps) {
        const { playedTimeSec, lyric } = this.props;
        const newPlayedTimeSec = nextProps.playedTimeSec;
        let tempIndex = this.state.indexLine;
        if (playedTimeSec !== newPlayedTimeSec ) {
            for (let i=0; i<lyric.length-1; i++) {
                if (newPlayedTimeSec < lyric[i+1].time && newPlayedTimeSec > lyric[i].time) {
                    this.setState({
                        indexLine: i,
                    })
                    tempIndex = i;
                    // this.indexLine = i;
                    break;
                }
            }
            this.goToLyricLine(tempIndex);
        }
    }

    goToLyricLine(tempIndex) {
        const lyricLine = 'lyricLine'+tempIndex;
        const node = ReactDOM.findDOMNode(this.refs[lyricLine]);   
        scrollIntoViewIfNeeded(node, {
            centerIfNeeded: true
        });
        
    }

    render() {
        const {lyric} = this.props;
        const { indexLine } = this.state;
        const lyricItem = lyric.map((item, index) => {
            const lyricLine = 'lyricLine'+index;
            return (
                <div ref={lyricLine} className={classnames('item', indexLine===index ? 'selected' : '')} key={index}>
                    {item.content}
                </div>
            )
        })
        return (
            <div className="lyric-container">
                {lyricItem}
            </div>
        )
    }
}

export default Lyric;