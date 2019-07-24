import React, { Component } from 'react'
import { Card, Icon, Button, Table, message, Modal } from 'antd'
import { reqCategories, reqUpdateCategories, reqAddCategories } from '../../api'
import AddForm from './add-form'
import UpdateForms from './update-form'

class Category extends Component {

  state = {
    categories: [], //一级分类列表
    parentId: '0', //当前需要显示的分类列表的父分类ID
    subCategories: [], //二级分类列表
    parentName: '',// 当前需要显示的分裂列表的父分类名称
    showStatus: 0, // 0都不显示，1.添加，2.更新
  }
  // 点击隐藏确认框
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      showStatus: 0,
    })
  }

  //@显示:增加分类
  showAddCategories = () => {
    this.setState({
      showStatus: 1,
    })
  }

  //@添加分类
  addCategory = () => {
   this.form.validateFields(async(err,val) => {
     if (!err) {
       //隐藏分类框
       this.setState({
         showStatus: 0,
       })
       //取到子组件传入的值
       const {parentId, categoryName} = this.form.getFieldsValue()
       this.form.resetFields()
       //收集信息，调用接口添加分类
       const results = await reqAddCategories(parentId, categoryName)
       if (results.data.status === 0) {
         //更新列表
         if (parentId === this.state.parentId) {
           this.getCategories()
         } else if (parentId === '0') {
           this.getCategories('0')
         }
       }
     }
   })
  }

  //显示更新数据框
  showUpdateCategory = (categories) => {
    this.categories = categories
    this.setState({
      showStatus: 2,
    })
  }

  //更新分类
  updateCategory = () => {
    //进行表单验证，通过才处理
    this.form.validateFields(async (err, val) => {
      if (!err) {
        //  1.隐藏分类框2.输入的名称要符合要求
        this.setState({
          showStatus: 0,
        })
        //2.发请求更新数据框,调用接口
        const categoryId = this.categories._id
        const categoryName = this.form.getFieldValue('categoryName')
        //清空输入数据
        this.form.resetFields()
        const results = await reqUpdateCategories({categoryId, categoryName})
        if (results.data.status === 0) {
          //3.重新显示数据
          this.getCategories()
        }
      }
    })

  }

  //显示指定分类列表的二级列表
  showSubCategories = (categories) => {
    //更新状态是异步的
    this.setState({
      parentId: categories._id,
      parentName: categories.name,
    }, () => {
      console.log('parentId', this.state.parentId) // '0'
      //获取二级分类列表
      this.getCategories()
    })
  }

  //显示一级分类列表
  showCategories = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategories: [],
    })
  }

  /**@getCategories:一级分类列表**/
  getCategories = async (parentId) => {
    parentId = parentId || this.state.parentId
    this.setState({loading: true})
    const results = await reqCategories(parentId)
    this.setState({loading: false})
    if (results.data.status === 0) {
      // 取出分类数组，可能一级或者二级
      const categories = results.data.data
      //更新状态
      if (parentId === '0') {
        this.setState({
          categories,
        })
      } else {
        this.setState({
          subCategories: categories,
        })
      }
    } else {
      message.error('获取列表失败')
    }
  }

  /**@initColumns: 初始化列的数组**/
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (categories) => (
            <span>
						<Button
                onClick={() => {
                  this.showUpdateCategory(categories)
                }}
                size='small' icon='tool'
                type='link'
            >修改分类</Button>
              {/*如何向事件回调函数传递参数:先定义一个匿名函数，在函数调用处理的函数并传入数据*/}
              {this.state.parentId === '0' ?
                  <Button size='small'
                          icon='unordered-list'
                          type='link'
                          onClick={() => this.showSubCategories(categories)}
                  >查看子分类</Button> : null}
					</span>
        ),
      },
    ]
  }

  // 第一次render的准备数据
  componentWillMount() {
    this.initColumns()
  }

  //执行异步任务：发送异步ajax请求
  componentDidMount() {
    this.getCategories()
  }

  render() {
    const {categories, loading, parentId, subCategories, parentName, showStatus} = this.state
    //读取指定的分类
    const category = this.categories || {}
    //Card左侧
    const title = parentId === '0' ? '一级分类列表' : (
        <span>
          <Button
              size='small'
              icon='home'
              type='link'
              onClick={this.showCategories}
          >一级分类列表</Button>
          <Icon style={{marginRight: '10px'}} type="double-right"/>
          <span>{parentName}</span>
        </span>
    )
    //Card右侧
    const extra = (
        <Button
            onClick={this.showAddCategories}
            type='primary'>
          <Icon type='plus'/>
          添加
        </Button>
    )
    return (
        <div>
          <Card title={title} extra={extra}>
            <Table
                loading={loading}
                dataSource={parentId === '0' ? categories : subCategories}
                bordered
                size="middle"
                columns={this.columns}
                pagination={{defaultPageSize: 6, showQuickJumper: true}}
                rowKey='_id'/>
            <Modal
                title="添加内容"
                visible={showStatus === 1}
                onOk={this.addCategory}
                onCancel={this.handleCancel}
            >
              <AddForm
                  categories={categories}
                  parentId={parentId}
                  setForm={form => {
                    this.form = form
                  }}
              />
            </Modal>
            <Modal
                title="修改内容"
                visible={showStatus === 2}
                onOk={this.updateCategory}
                onCancel={this.handleCancel}
            >
              <UpdateForms
                  categoryName={category.name}
                  setForm={(form) => {
                    this.form = form
                  }}
              />
            </Modal>
          </Card>
        </div>
    )
  }
}

export default Category
