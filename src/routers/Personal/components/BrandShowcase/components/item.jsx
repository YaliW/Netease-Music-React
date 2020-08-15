import React from 'react';
import { PLACE_HOLDER_IMG } from '../mock';
import '../../../../../assets/scss/personal/BrandShowcase.scss';

export default (props) => {
  const { data = {}, scalStyle } = props;

  const {
    itemList = [],
    shopLogo = '',
  } = data;
  const item = itemList.length > 0 ? itemList[0] : {};
  const { itemImg = '' } = item;

  return (
    // 固定宽度，根据 scale 按比例缩小
    <div className="item-wrapper"
      style={{
        transform: `scale(${scalStyle})`
      }}
    >
      <img src={itemImg || PLACE_HOLDER_IMG} alt="" />
    </div>

  )
}
