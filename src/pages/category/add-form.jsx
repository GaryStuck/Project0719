import React, { Component } from 'react'
import { Form, Icon, Input, Select } from 'antd'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
  render() {
    const {getFieldDecorator} = this.props.form
    return (
        <Form>
          <Item>
            {
              getFieldDecorator('parentId', {
                initialValue: '0',
              })(
                  <Select>
                    <Option value='0'>一级分类</Option>
                    <Option value='1'>电脑</Option>
                    <Option value='2'>图书</Option>
                  </Select>,
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator('categoryName', {
                initialValue: '',
              })(
                  <Input
                      prefix={<Icon type="form"
                                    style={{color: 'rgba(0,0,0,.25)'}}/>}
                      autoComplete= "false" placeholder="请输入分类名称"/>,
              )
            }
          </Item>
        </Form>
    )
  }
}

const WrapForm = Form.create()(AddForm)
export default WrapForm