import React, { Component } from 'react'
import { Button, Table, Card, Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import { formateDate } from '../../utils/dateUtils'

class Role extends Component {
  
  state = {
    roles: [],//所有角色列表
    role: {},//选中的角色
    isShowAdd: false,//是否显示添加页面
    isShowAuth: false,//角色权限页面显示
  }
  
  constructor(props) {
    super(props)
    this.auth = React.createRef()
  }
  
  //修改角色权限
  updateAuth = async () => {
    const role = this.state.role
    //取到最新的menus
    role.menus = this.auth.current.getMenus()
    role.auth_name = memoryUtils.user.username
    role.auth_time = Date.now();
    //发送请求
    const {data: {data, status}} = await reqUpdateRole(role)
    //反馈结果
    if (status === 0) {
      this.setState({isShowAuth: false})
      message.success('更新角色成功')
    } else {
      message.error('修改失败')
    }
  }
  
  //添加角色
  addRole = () => {
    //收集数据
    this.form.validateFields(async (errors, values) => {
      if (!errors) {
        const {roleName} = values
        const {data: {data, status}} = await reqAddRole(roleName)
        if (status === 0) {
          message.success('添加角色成功')
          this.form.resetFields()
          this.setState({isShowAdd: false})
          // const {role} = data
          // const roles = [...this.state.roles]
          // roles.push(role)
          // this.setState({roles})
          this.getRoles();
        } else {
          message.error('添加角色失败')
        }
      }
    })
    //发送请求
  }
  //初始化行菜单
  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        key: '0',
        dataIndex: 'name',
      }, {
        key: '1',
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      }, {
        key: '2',
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      }, {
        key: '3',
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ]
  }
  //鼠标选中行
  onRow = (role) => {
    return {
      onClick: (e) => {
        this.setState({role})
      },
    }
  }
  //@func:角色列表
  getRoles = async () => {
    let {data: {data, status}} = await reqRoles()
    if (status === 0) {
      this.setState({roles: data})
    } else {
      message.error('获取角色列表失败')
    }
  }
  
  componentWillMount() {
    this.initColumn()
  }
  
  //获取角色列表
  componentDidMount() {
    this.getRoles()
  }
  
  render() {
    const {roles, role, isShowAdd, isShowAuth} = this.state
    const title = (
      <span>
        <Button type={'primary'}
                onClick={() => {
                  this.setState({isShowAdd: true})
                }}
        >创建角色</Button>&nbsp;&nbsp;
        <Button
          onClick={() => {
            this.setState({isShowAuth: true})
          }}
          type={'primary'}
          disabled={!role._id}>设置角色权限</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          size='middle'
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize: PAGE_SIZE}}
          rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
          onRow={this.onRow}
        />
        <Modal
          title='添加角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false})
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          title={'设置角色权限'}
          visible={isShowAuth}
          onOk={this.updateAuth}
          onCancel={() => {
            this.setState({isShowAuth: false})
          }}>
          <AuthForm ref={this.auth} role={role}/>
        </Modal>
      </Card>
    )
  }
}

export default Role