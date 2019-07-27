import React, { Component } from 'react'
import { Card, Select, Icon, Button, Table, Input, message } from 'antd'
import { reqGetList, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

class ProductHome extends Component {

  state = {
    products: [], //商品数组
    total: 0,
    loading: false,
    searchName: '', //搜索关键字
    searchType: 'productName', //估计字段搜索
  }
  //获取商品列表
  getProducts = async (pageNum) => {
    this.pageNum = pageNum //获取当前页数
    this.setState({loading: true})
    const {searchName, searchType} = this.state
    let results
    //如果搜索关键字有值，则调用搜索接口
    if (searchName) {
      console.log(searchType, searchName)
      results = await reqSearchProducts(
          {pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    } else { //一般分页请求
      results = await reqGetList(pageNum, PAGE_SIZE)
    }
    const data = results.data
    // console.log(data)
    if (data.status === 0) {
      this.setState({
        products: data.data.list,
        total: data.data.total,
        loading: false,
      })
    } else {
      message.error('获取列表失败，请刷新重试')
    }
  }
  // 初始化列
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width: 100,
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        render: (product) => '¥' + product.price, //当前指定了对应的属性，传入的是对应的属性的值
      }, {
        title: '状态',
        textAlign: 'center',
        // dataIndex: 'status',
        render: ({status, _id}) => {
          return (
              <span>
                <Button
                    {...console.log(status)}
                    onClick={() => this.updateStatus(status === 1 ? 2 : 1, _id)}
                    type={'primary'}>{status === 1 ? '下架' : '上架'}</Button>
                <span>{status === 2 ? '已下架' : '在售'}</span>
              </span>
          )
        },
      }, {
        title: '操作',
        width: 100,
        render: (product) => {
          return (
              <span>
                <Button
                    onClick={() => this.props.history.push('/product/detail',
                        {product})}
                    type={'link'}>详情</Button>
                <Button
                    onClick={() => this.props.history.push('/product/addupdate',product)}
                    type={'link'}>修改</Button>
              </span>
          )
        },
      },
    ]
  }
  //更新商品状态
  updateStatus = async (status, productId) => {
    const result = await reqUpdateStatus(productId, status)
    // console.log(result)
    if (result.data.status === 0) {
      this.getProducts(this.pageNum)
      message.success('更新成功')
      //在当前页数更新
    }
  }

  //初始化table列的数组
  componentWillMount() {
    this.initColumns()
  }

  //获取商品列表
  componentDidMount() {
    this.getProducts(1)
  }

  render() {
    const {products, total, loading, searchName, searchType} = this.state

    const title = (
        <span>
          <Select value={searchType} style={{width: '150px'}}
                  onChange={value => this.setState({searchType: value})}>
            <Option value='productName'>按名称搜索</Option>
            <Option value='productDesc'>按描述搜索</Option>
          </Select>
          <Input style={{width: '180px', margin: '0 10px'}}
                 placeholder="关键字"
                 onChange={e => this.setState({searchName: e.target.value})}
                 value={searchName}/>
          <Button
              onClick={() => this.getProducts(1)}
              type='primary'>搜索</Button>
        </span>
    )
    const extra = (
        <Button type='primary'
          onClick={() => this.props.history.push('/product/addupdate')}
        >
          <Icon type='plus'/>添加商品
        </Button>
    )
    return (
        <Card title={title} type='inner' extra={extra}>
          <Table rowKey='_id'
                 align='center'
                 dataSource={products}
                 bordered
                 size="middle"
                 loading={loading}
                 pagination={{
                   defaultPageSize: PAGE_SIZE,
                   showQuickJumper: true,
                   total: total,
                   onChange: this.getProducts,
                 }}
                 columns={this.columns}
          />
        </Card>
    )
  }
}

export default ProductHome