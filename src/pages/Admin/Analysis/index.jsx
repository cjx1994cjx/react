import React, { Component } from 'react'

// 引入删格组件
import { Row, Col , Statistic} from 'antd'

import {CaretUpOutlined,CaretDownOutlined} from '@ant-design/icons'

// 引入本地Card
import Card from '../../../components/Card'

// 定义响应式
const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}
export default class Analysis extends Component {

  render() {
    return (
      <div>
        {/* gutter是间隔 */}
        <Row gutter={[16, 16]}>
          
          <Col {...firstRowCol} ><Card title={<Statistic title='总销售额' value={112983} prefix={'￥'} /> }  footer={<span>日销售额￥12，432</span>}>
          <span style={{marginRight:20}}>周同比 10% <CaretUpOutlined style={{color:'red'}}/>
            </span>
          <span>日同比 9%<CaretDownOutlined style={{color:'balck'}}/>
            </span>
          </Card>
          
          </Col>
          <Col {...firstRowCol}>
            <Card></Card>
          </Col>
          <Col {...firstRowCol}><Card></Card></Col>
          <Col {...firstRowCol}><Card></Card></Col>
        </Row>

      </div>
    )
  }
}
