import React, {useMemo, useState, useEffect} from 'react';
import { MOCK_DATA } from '../mock';
import './index.scss';
import bg from 'assets/img/brandshowcase_bg.jpg';
import Item from '../components/item';
import {
  getLayoutByScrollX,
  minScrollX,
  maxScrollX,
  getScrollXByCount,
  UnitWidth
} from '../utils';

let lastX = 0;
let currentX = 0;
let preAction = 0;
let timer = null;

export default () => {
  const data = MOCK_DATA;
  const [ scrollX, setScrollX ] = useState(getScrollXByCount(2.5));
  const [ isTouching, setIsTouching ] = useState(false);

  const layouts = useMemo(() =>
    getLayoutByScrollX(scrollX, data.length), [scrollX, data.length]
  );

  console.log(layouts, 'layouts');

  const handleTouchStart = (e) => {
    lastX = e.touches[0].clientX;
    setIsTouching(true);
    preAction = new Date().valueOf();
    console.log(e, 'start');
  }

  const handleTouchMove = (e) => {
    currentX = e.touches[0].clientX;
    setIsTouching(true);
    const currAction = new Date().valueOf();

    if (currAction - preAction > 40) {
      preAction = currAction;
      const diffX = (currentX - lastX) / document.body.clientWidth * 750;
      const target = scrollX - diffX;
      setScrollX(target < minScrollX ? minScrollX : target > maxScrollX ? maxScrollX : target);
      lastX = currentX;
    }
  }

  const handleTouchEnd = () => {
    lastX = 0;
    currentX = 0;
    setIsTouching(false);
  }

  useEffect(() => {
    timer = setInterval(() => {
      const currScrollX = parseInt(document.getElementById('scrollX').dataset.scroll, 10);
      if (currScrollX >= maxScrollX || currScrollX <= minScrollX) {
        clearInterval(timer);
      }

      for (let index = 0; index < 10; index ++) {
        setTimeout(() => {
          const nextScrollX = currScrollX + (index + 1) * 0.1 * UnitWidth;
          setScrollX(nextScrollX < minScrollX ? minScrollX : nextScrollX > maxScrollX ? maxScrollX : nextScrollX);
        }, index * 25);
      }
    }, 3000);
    return () => {
      clearInterval(timer);
    }
  })

  return (
    <div className="container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="brand-showcase-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="brand-showcase-wrapper-content"
          id="scrollX" data-scroll={scrollX}>
          {/* 占位 */}
          {data.slice(0, 12).map(index =>
            <div key={index} className="item-place-holder" />
          )}
          {/* 从占位的宽度，逐渐按比例缩小 */}
          {data.slice(0, 12).map((item, index) =>
            (<div className="item-wapper-layout"
              key={index}
              style={{
                width: layouts[index].width + 'px',
                height: layouts[index].width + 'px',
                left: layouts[index].position.left + 'px',
                right: layouts[index].position.right + 'px'
              }}
            >
              <Item data={item} scalStyle={layouts[index].ratio} />
            </div>)
          )}

        </div>
      </div>

    </div>
  );
};
