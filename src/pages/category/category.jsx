import React, { Component } from 'react'
import { Card, Icon, Button, Table } from 'antd'

class Category extends Component {
  render() {

    //Card左侧
    const title = '一级分类列表'
    //Card右侧
    const extra = (
        <Button type='primary'>
          <Icon type='plus'/>
          添加
        </Button>
    )
    const dataSource = [
      {
        'parentId': '0',
        'name': '家用电器',
        '_id': '5ca9d695b49ef916541160ba',
        '__v': 0,
      }, {
        'parentId': '0',
        'name': '家用电器',
        '_id': '5ca9d695b49ef91654110260ba',
        '__v': 0,
      }, {
        'parentId': '0',
        'name': '家用电器',
        '_id': '5ca9d695b4902ef916541160ba',
        '__v': 0,
      },
    ]

    const columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
	      width:300,
        render: () => (
            <span>
						<Button  size='small' icon='tool' type='link'>修改分类</Button>
						<Button  size='small' icon='unordered-list' type='link'>查看子分类</Button>
					</span>
        )
      },
    ]

    return (
        <div>
          <Card title={title} extra={extra}>
            <Table dataSource={dataSource} bordered columns={columns} rowKey='_id'/>
          </Card>
        </div>
    )
  }
}

export default Category