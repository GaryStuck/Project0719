/**
 * @file:入口js
 * **/

import React from 'react';
import ReactDom from 'react-dom';
//直接在路口js中存储用户信息到内存中去
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import App from './App';

const user = storageUtils.getUser();
memoryUtils.user = user;
/**
 * @param: 将App组件标签渲染到页面id为'root'的div上
 * **/
ReactDom.render(<App/>,document.getElementById('root'));

