/**@file:头部组件**/

import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { reqWeather } from '../../api'
import { withRouter } from 'react-router-dom'
import { formateDate } from '../../utils/dateUtils'
import './index.less';
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'

class Index extends Component {
  constructor(props) {
    super(props)
    this.title = ''
    this.timer = ''
  }
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }
  //注销用户
  Logout = () => {
    Modal.confirm({
      content: '确定退出？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        console.log('OK');
        storageUtils.removeUser(memoryUtils.user)
        memoryUtils.user = {}
        //跳转到登陆页面
        this.props.history.replace('/login')
      },
      onCancel: () => { }
    });
  }
  //获取当前匹配的路由位置
  getTitle = () => {
    const path = this.props.location.pathname;
    menuList.forEach((item) => {
      if (item.key === path) {
        this.title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.title = cItem.title
        }
      }
    })
  }
  //动态获取当前时间
  getTime = () => {
    this.timer = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  //获取天气情况
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({ dayPictureUrl, weather })
  }

  //销毁组件
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidMount() {
		/**第一次render之后，只执行一次
		 * 一般在此执行异步任务：发送ajax请求/启动定时器**/
    this.getTime();
    this.getWeather('北京');
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state;
    const username = memoryUtils.user.username;
    this.getTitle();
    return (
      <div className='header-wrapper'>
        <div className="header-content">
          <div className="header-top">
            <span>欢迎！{username}</span>
            <Button size='small' icon='logout' type='link' onClick={this.Logout}>注销</Button>
          </div>
          <div className="header-bottom">
            <div className="header-bottom-left">
              <span>{this.title}</span>
            </div>
            <div className="header-bottom-right">
              <span>{currentTime}</span>
              <img className="header-bottom-img" width="30" height="30" src={dayPictureUrl} alt={weather} />
              <span>{weather}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);