/**
 * @file:入口js
 * **/

import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

//直接在路口js中存储用户信息到内存中去
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import App from './App'
import store from './redux/store'

const user = storageUtils.getUser()
memoryUtils.user = user
/**
 * @param: 将App组件标签渲染到页面id为'root'的div上
 * **/
ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'))

