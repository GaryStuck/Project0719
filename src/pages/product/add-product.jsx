/***@file:更新商品*/

import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Cascader,
  Upload,
  Button,
  message,
} from 'antd'
import { reqCategories } from '../../api'

const {Item} = Form
const {TextArea} = Input

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
]

class ProductAddUpdate extends Component {

  state = {
    options: [],
  }

//提交表单验证，通过才发请求
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        message.success('提交成功')
      }
    })
  }

  //表单价格提交自定义验证
  validatorPrice = (rule, value, callback) => {
    if ((value * 1) > 0 && typeof (value * 1) === 'number') {
      callback()//验证通过
    } else if (typeof (value * 1) !== 'number') {
      callback('价格必须为数字')
    } else {
      callback('价格必须大于0')
    }
  }

  //调用接口，获取一级或二级列表,async异步函数的返回值(promise对象)由什么(async的结果)来决定的
  getData = async (parentId) => {
    const {data: {data, status}} = await reqCategories(parentId);
    if (status === 0) {
      if (parentId===0) {//一级列表
        this.initOptions(data)
      }else {//二级列表
        return data
      }
    }
  }

  //初始化列表,讲数据更新为当前options的数据
  initOptions = (data) => {
    const options = data.map(i => ({
      value: i._id,
      label: i.name,
      isLeaf: false
    }))
    this.setState({options})
  }
  // 加载下一级的回掉函数
  loadData = async selectedOptions => {
    //得到选中的option对象
    const targetOption = selectedOptions[0]
    targetOption.loading = true
    //根据选中的分类，获取二级分类列表
    const subData = await this.getData(targetOption.value)
    //模拟请求二级列表
    setTimeout(() => {
      targetOption.loading = false
      targetOption.children = subData.map(i => ({
        label: `${targetOption.label}`,
        value: i.value,
        isLeaf: true,
      }))
      this.setState({
        options: [...this.state.options],
      })
    }, 1000)
  }

  componentDidMount() {
    this.getData(0)
  }

  render() {
    const {getFieldDecorator} = this.props.form

    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 8},
    }

    const title = (
        <span onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: '20px', color: '#1e9eb3'}}/>
          <Button type='link' style={{fontSize: '20px'}}>添加商品</Button>
        </span>
    )

    return (
        <Card title={title}>
          <Form onSubmit={this.handleSubmit} autoComplete="false">
            <Item {...formItemLayout}
                  label={'商品名称'}>
              {
                getFieldDecorator('name', {
                  initialValue: '',
                  rules: [
                    {required: true, message: '商品名称不能为空'},
                  ],
                })(
                    <Input placeholder={'请输入商品名称'}/>,
                )
              }

            </Item>

            <Item {...formItemLayout}
                  label={'商品描述'}>
              {getFieldDecorator('desc', {
                rules: [
                  {required: true, message: '商品描述不能为空'},
                ],
              })(<TextArea autosize={{minRows: 2, maxRows: 8}}
                           placeholder={'在此输入商品描述'}/>)}
            </Item>

            <Item {...formItemLayout}
                  autocomplete='false'
                  label={'商品名称'}>
              {getFieldDecorator('price', {
                rules: [
                  {required: true, message: '此项不能为空'},
                  {validator: this.validatorPrice},
                ],
              })(<Input type={'number'} placeholder={'请输入商品价格'}
                        addonAfter={'元'}/>)}

            </Item>

            <Item {...formItemLayout}
                  label={'商品分类'}>
              <Cascader
                  options={this.state.options} /**显示的列表组*/
                  loadData={this.loadData} /**需要加载的数据**/
                  onChange={this.onChange}
                  changeOnSelect
                  placeholder={'请选择分类'}
              />
            </Item>

            <Item {...formItemLayout}
                  label={'商品图片'}>
              <Cascader placeholder={'请选择商品分类'} options={''}/>
            </Item>

            <Item {...formItemLayout}
                  label={'商品详情'}>
              <Cascader placeholder={'请选择商品分类'} options={''}/>
            </Item>
            <Item {...formItemLayout}
                  label={'提交商品'}>
              <Button type='primary' htmlType="submit">提交</Button>
            </Item>
          </Form>
        </Card>
    )
  }
}

const AddUpdate = Form.create()(ProductAddUpdate)

export default AddUpdate