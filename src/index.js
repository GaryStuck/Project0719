/**
 * @file:入口js
 * **/

import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

/**
 * @param: 将App组件标签渲染到页面id为'root'的div上
 * **/
ReactDom.render(<App/>,document.getElementById('root'));

