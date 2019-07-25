import React, { Component } from 'react'
import { Form, Icon, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired, //一级分类数组
    parentId: PropTypes.string.isRequired, //父分类ID
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {categories, parentId} = this.props
    // console.log(categories)
    return (
        <Form>
          <Item>
            {
              getFieldDecorator('parentId', {
                initialValue: parentId,
              })(
                  <Select>
                    <Option value='0' key="0">一级分类</Option>
                    {categories.map(item => <Option value={item._id}
                                                    key={item._id}>{item.name}</Option>)}
                  </Select>,
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator('categoryName', {
                initialValue: '',
                rules: [
                  {required: true, message: '内容不能为空'},
                ],
              })(
                  <Input
                      prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      placeholder="请输入分类名称"/>,
              )
            }
          </Item>
        </Form>
    )
  }
}

const WrapForm = Form.create()(AddForm)
export default WrapForm