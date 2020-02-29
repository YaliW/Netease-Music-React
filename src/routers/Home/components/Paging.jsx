import React, { useState, useMemo } from 'react';

function getTotalPages(a, b) {
  return Math.ceil(a / b);
}

function getLeftEllipsis(param) {
  return param > 4;
}

function getRightEllipsis(totalPlay, limit, currPage) {
  return Math.ceil(totalPlay / limit) - currPage > 4;
}

function getCenterArr(totalPlay, limit, currPage) {
  const result = [];
  const totalPages = Math.ceil(totalPlay / limit);
  const left = currPage > 5 ? (totalPages < currPage + 4 ? Math.ceil(totalPlay / limit) - 7 : currPage - 3) : 2;
  const isEnough = Math.ceil(totalPlay / limit) > currPage + 3;
  const right = isEnough ? Math.max(currPage + 3, left + 6) : Math.ceil(totalPlay / limit) - 1;
  for (let index = left; index <= right; index++) {
      result.push(index);
  }
  return result;
}

function Paging(props) {
    const limit = 35;
    const [ offset, setOffset ] = useState(0);
    const [ currPage, setCurrPage ] = useState(1);
    const totalPlay = props.data;

    const totalPages = useMemo(()=> getTotalPages(totalPlay, limit), [totalPlay, limit]);
    const leftEllipsis = useMemo(() => getLeftEllipsis(currPage), [currPage]);
    const rightEllipsis = useMemo(() => getRightEllipsis(totalPlay, limit, currPage), [totalPlay, limit, currPage]);
    const centerArr = useMemo(() => getCenterArr(totalPlay, limit, currPage), [totalPlay, limit, currPage]);

    let leftEllipsisDom = null;
    if (leftEllipsis) {
        leftEllipsisDom = <span>...</span>
    }
    const centerArrDom = centerArr.map((item) => {
        return (
            <span key={item}>
                <span className={`num-page ${currPage === item ? 'curr-page' : ''}`} onClick={() => clickPage(item)}>{item}</span >
            </span>
        )
    })
    let rightEllipsisDom = null;
    if (rightEllipsis) {
        rightEllipsisDom = <span>...</span>
    }
    return (
        <div className="paging-wrapper">
            <div className="paging-container">
                <span className={`page prev-page ${currPage === 1 ? 'grey-prev-page' : ''}`} onClick={() => clickPrevPage()}>上一页</span >
                <span className={`num-page ${currPage === 1 ? 'curr-page' : ''}`} onClick={() => clickPage(1)}>1</span>
                {leftEllipsisDom}
                {centerArrDom}
                {rightEllipsisDom}
                <span className={`num-page ${currPage === totalPages ? 'curr-page' : ''}`} onClick={() => clickPage(totalPages)}>{totalPages}</span >
                <span className={`page next-page ${currPage === totalPages ? 'grey-next-page' : ''}`} onClick={() => clickNextPage()}>下一页</span >
            </div>
        </div>
    )

    function clickPage(page) {
      setCurrPage(page);
      setOffset(limit * (page - 1));
      handleClick();
    }

    function clickPrevPage() {
      if (currPage > 1) {
        setCurrPage(currPage - 1);
        setOffset(limit * (currPage - 2));
        handleClick();
      }
    }
    function clickNextPage() {
      if (currPage < Math.ceil(totalPlay / limit)) {
        setCurrPage(currPage+1);
        setOffset(limit * (currPage));
        handleClick();
      }
    }

    function handleClick() {
      props.onChange(offset);
    }
}

export default Paging;
