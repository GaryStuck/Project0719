import React, { Component } from 'react'
import { Form, Icon, Input, Tree } from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree

class AuthForm extends Component {
  //初试化显示被选中的项
  constructor(props) {
    super(props)
    const { menus } = this.props.role
    this.state = { checkedKeys: menus }
  }
  /*为父组件获取最新的menus的方法 */
  getMenus = () => this.state.checkedKeys
  //状态管理
  static propTypes = {
    role: PropTypes.object,
  }
  //选中某个node时的回掉
  onCheck = checkedKeys => {
    // console.log(checkedKeys)
    this.setState({ checkedKeys })
  }
  //获取树节点
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>,
      )
      //将pre返回
      return pre
    }, [])
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps)
    const menus = nextProps.role.menus
    this.setState({checkedKeys:menus})
  }
  
  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  render() {
    // const {getFieldDecorator} = this.props.form
    const { role } = this.props
    const { checkedKeys } = this.state
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    return (
      <div>
        <Item label={'角色名称'} {...formItemLayout}>
          <Input
            value={role.name}
            disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll={false}
          checkedKeys={checkedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="key">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}

export default AuthForm
