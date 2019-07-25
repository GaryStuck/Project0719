/***@file:商品详情添加*/

import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqGetCategory } from '../../api'

const Item = List.Item

class Detail extends Component {

  state = {
    cName1: '', //一级类
    cName2: '', //二级分类
  }

  async componentDidMount() {
    const {categoryId, pCategoryId} = this.props.location.state.product
    if (pCategoryId === '0') {
      let results = await reqGetCategory(categoryId)
      this.setState({
        cName1: results.data.data.name,
      })
    } else {
      /**@async通过多个await发送多个请求*@param:可以一次性发送多个请求*/
      const results = await Promise.all(
          [reqGetCategory(pCategoryId), reqGetCategory(categoryId)])
      const cName1 = results[0].data.data.name
      const cName2 = results[0].data.data.name
      // console.log(cName2,+'*****'+cName1)
      this.setState({
        cName1,
        cName2,
      })
    }
  }

  render() {
    const {product} = this.props.location.state
    const {cName1, cName2} = this.state
    // console.info(product)
    const title = (
        <span>
          <Icon onClick={
            () => this.props.history.goBack()
          } style={{color: 'red', marginRight: '10px', fontSize: '20px'}}
                type='arrow-left'/>
          <span>商品详情</span>
      </span>
    )
    return (
        <Card
            title={title}
            className='product-detail'
        >
          <List>
            <Item>
              <span className="left">商品名称：</span>
              <span>{product.name}</span>
            </Item>
            <Item>
              <span className="left">商品描述：</span>
              <span>{product.desc}</span>
            </Item>
            <Item>
              <span className="left">商品价格：</span>
              <span>{product.price}</span>
            </Item>
            <Item>
              <span className="left">所属分类：</span>
              <span>{cName1}{cName2 ? '=>' + cName2 : ''}</span>
            </Item>
            <Item>
              <span className="left">商品图片：</span>
              {product.imgs.map(i =>
                  <img width={'100'} height={'100'}
                       className={'detail-img'}
                       key={i}
                       src={BASE_IMG_URL + i}
                       alt={i}/>,
              )}
            </Item>
            <Item>
              <span className="left">商品详情：</span>
              <span dangerouslySetInnerHTML={{__html: product.detail}}>

              </span>
            </Item>
          </List>
        </Card>
    )
  }
}

export default Detail