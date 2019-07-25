/**@file:左侧导航组件
 * params:debugger**/

import React, { Component } from 'react'
import './index.less'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'

const {SubMenu} = Menu

class LeftNav extends Component {

  /**根据menu的数据生成对于的标签数组**/
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
        )
      } else {
        return (
            <SubMenu key={item.key}
                     title={
                       <span>
                     <Icon type={item.icon}/>
                     <span>{item.title}</span>
                   </span>
                     }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
        )
      }
    })
  }

  /**reduce方式实现动态添加标签**/
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      // 向pre中添加项
      if (!item.children) {
        pre.push(
            (
                <Menu.Item key={item.key}>
                  <Link to={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
            ),
        )
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }

        pre.push((
            <SubMenu key={item.key}
                     title={
                       <span>
                     <Icon type={item.icon}/>
                     <span>{item.title}</span>
                   </span>
                     }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>))
      }
      return pre
    }, [])
  }

  componentWillMount() {
    this.menuNodes =  this.getMenuNodes(menuList)
  }

  render() {
    const path = this.props.location.pathname
    const openKey = this.openKey

    return (
        <div className='leftNav-wrapper'>
          <Link to='/home'>
            <div className="leftNav-header">
              <Icon className='account-book' type="account-book"/>
              <span className='company-name'>DUNO快速开发平台</span>
            </div>
          </Link>
          <div>
            <Menu
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                mode="inline"
                theme="dark"
            >
              {
                this.menuNodes
              }
            </Menu>
          </div>
        </div>
    )
  }
}

/**
 * @param:{
 *   withRouter:高阶组件，包装非路由组件，返回一个新组件
 *   新的组件向非路由组件传递是那个属性：
 *   history/location/match
 * }**/

export default withRouter(LeftNav)