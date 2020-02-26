import React from 'react';

export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};
  
// 创建 context， 并且添加默认值
// 导出ThemeContext， 在需要使用 context 的组件处，导入 ThemeContext
export const ThemeContext = React.createContext(
    themes.dark
);