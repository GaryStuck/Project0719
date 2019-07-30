/**
 * @file:redux最核心的管理对象**/
import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
//向外默认暴露一个store
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))