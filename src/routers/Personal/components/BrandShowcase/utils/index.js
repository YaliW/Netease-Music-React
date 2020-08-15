
/**
 * @param {*} input 当前位于中间位置的产品0 到 sum-1，值的范围是 1 - （sum - 2）
 * @param {*} sum 产品总数
 */

export const ContainerWidth = 556;
export const UnitWidth = 212;
const ContentWidth = 200;

const firstRatio = 1;
const secondRatio = 172 / 212;
const thirdRatio = 144 / 212;

const minCount = 1.5;
export const maxCount = 9.5;

/**
 * const LinearShrink = 0 200 192 160 329 132
 * @param {*} input 第几个卡片在中间
 * @returns number 当前卡片的滚动距离scroll
 */
export const getScrollXByCount = (input) => {
  let value = input;
  if (value <= minCount) {
    value = minCount;
  } else if (value >= maxCount) {
    value = maxCount;
  }
  return UnitWidth * value - ContainerWidth / 2;
};

export const getCountByScrollX = (input) => {
  return Math.round((input + ContainerWidth / 2) / UnitWidth + 0.5) - 0.5;
};

export const minScrollX = getScrollXByCount(minCount);
export const maxScrollX = Math.floor(getScrollXByCount(maxCount));
/**
 *
 * @param {*} input 容器内scroll的偏移宽度
 * @param {*} sum 产品总数
 */

export const getLayoutByScrollX = (input, sum) => {
  console.log(input, sum, 'scroll x');

  const result = [];
  for (let index = 0; index++; index < sum - 1) {
    result.push({ ratio: 1, position: {} });
  };
  const centerPoint = input + ContainerWidth / 2;
  const activeIndex = Math.floor(centerPoint / UnitWidth); // 屏幕中间元素
  let diffRatio = (centerPoint - activeIndex * UnitWidth - UnitWidth / 2) / UnitWidth;

  if (diffRatio >= 0) {
    // 左边多
    const currRatio = 1 - diffRatio * (firstRatio - secondRatio);
    const currInfo = {
      width: currRatio * UnitWidth,
      ratio: (currRatio * UnitWidth - 12) / ContentWidth,
      position: {
        left: ContainerWidth / 2 - UnitWidth * currRatio * (0.5 + diffRatio),
        right: ContainerWidth / 2 - UnitWidth * currRatio * (0.5 - diffRatio),
      },
    };
    result[activeIndex] = currInfo;
    let index = activeIndex - 1;
    while (index >= 0) {
      if (index === activeIndex - 1) {
        const tempRatio = secondRatio - diffRatio * (secondRatio - thirdRatio);
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: result[index + 1].position.left - tempRatio * UnitWidth,
            right: ContainerWidth - result[index + 1].position.left,
          }
        };
        result[index] = info;
      } else {
        // 左二及之后
        const tempRatio = thirdRatio;
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: result[index + 1].position.left - tempRatio * UnitWidth,
            right: ContainerWidth - result[index + 1].position.left,
          }
        };
        result[index] = info;
      }
      index --;
    }
    // 计算右侧位置
    index = activeIndex + 1;
    while (index < sum) {
      if (index === activeIndex + 1) {
        const tempRatio = secondRatio + diffRatio * (firstRatio - secondRatio);
        const info = {
          // innerwidth: OUTERWIDTH - 2 * WHITESPACE
          // SCALE: WIDTH / INITIALWIDTH
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: ContainerWidth - result[index - 1].position.right,
            right: result[index - 1].position.right - tempRatio * UnitWidth,
          }
        };
        result[index] = info;
      } else if (index === activeIndex + 2) {
        const tempRatio = thirdRatio + diffRatio * (secondRatio - thirdRatio);
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: ContainerWidth - result[index - 1].position.right,
            right: result[index - 1].position.right - tempRatio * UnitWidth,
          }
        };
        result[index] = info;
      } else {
        const tempRatio = thirdRatio;
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: ContainerWidth - result[index - 1].position.right,
            right: result[index - 1].position.right - tempRatio * UnitWidth,
          }
        };
        result[index] = info;
      }
      index++;
    }
  } else {
    // 右边多
    diffRatio = Math.abs(diffRatio);
    const currRatio = 1 - diffRatio * (firstRatio - secondRatio);
    const currInfo = {
      width: currRatio * UnitWidth,
      ratio: (currRatio * UnitWidth - 12) / ContentWidth,
      position: {
        left: ContainerWidth / 2 - UnitWidth * currRatio * (0.5 - diffRatio),
        right: ContainerWidth / 2 - UnitWidth * currRatio * (0.5 + diffRatio),
      },
    };
    result[activeIndex] = currInfo;
    let index = activeIndex + 1;
    while (index < sum) {
      if (index === activeIndex + 1) {
        const tempRatio = secondRatio - diffRatio * (secondRatio - thirdRatio);
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: ContainerWidth - result[index - 1].position.right,
            right: result[index - 1].position.right - tempRatio * UnitWidth,
          }
        };
        result[index] = info;
      } else {
        // 右二及之后
        const tempRatio = thirdRatio;
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: ContainerWidth - result[index - 1].position.right,
            right: result[index - 1].position.right - tempRatio * UnitWidth,
          }
        };
        result[index] = info;
      }
      index ++;
    }
    // 计算左侧位置
    index = activeIndex - 1;
    while (index >= 0) {
      if (index === activeIndex - 1) {
        const tempRatio = secondRatio + diffRatio * (firstRatio - secondRatio);
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: result[index + 1].position.left - tempRatio * UnitWidth,
            right: ContainerWidth - result[index + 1].position.left,
          }
        };
        result[index] = info;
      } else if (index === activeIndex - 2) {
        const tempRatio = thirdRatio + diffRatio * (secondRatio - thirdRatio);
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: result[index + 1].position.left - tempRatio * UnitWidth,
            right: ContainerWidth - result[index + 1].position.left,
          }
        };
        result[index] = info;
      } else {
        const tempRatio = thirdRatio;
        const info = {
          ratio: (tempRatio * UnitWidth - 12) / ContentWidth,
          width: tempRatio * UnitWidth,
          position: {
            left: result[index + 1].position.left - tempRatio * UnitWidth,
            right: ContainerWidth - result[index + 1].position.left,
          }
        };
        result[index] = info;
      }
      index--;
    }
  }

  return result;
};
