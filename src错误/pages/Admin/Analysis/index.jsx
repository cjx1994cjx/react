import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
// 引入删格组件
import { Row, Col, Statistic } from 'antd'

// 引入面积图
import { AreaChart } from 'bizcharts';

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

// 引入柱形图
import { ColumnChart } from 'bizcharts';

// 引入本地Card
// import Card from '../../../components/Card'
import Card from '@comps/Card'

// 定义响应式
const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}

// 面积图 数据源
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
export default class Analysis extends Component {

  render() {
    return (
      <div>
        {/* gutter是间隔 */}
        <Row gutter={[16, 16]}>

          <Col {...firstRowCol} >
            <Card title={<Statistic title='总销售额' value={112983} prefix={'￥'} />} footer={<span>日销售额￥12，432</span>}>
              <span style={{ marginRight: 20 }}>周同比 10% <CaretUpOutlined style={{ color: 'red' }} />
              </span>
              <span>日同比 9%<CaretDownOutlined style={{ color: 'balck' }} />
              </span>
            </Card>

          </Col>
          <Col {...firstRowCol}>
            <Card title={<Statistic title='总销售额' value={112983} prefix={'￥'} />} footer={<span>日销售额￥12，432</span>}>
              <AreaChart
                data={data}
                // title={{
                //   visible: true,
                //   text: '面积图',
                // }}
                xField='year'
                yField='value'
                // xAxis={{visible: false}}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}><Card title={<Statistic title='支付笔数' value={33333} prefix={'￥'} />} footer={<span>转化率 80%</span>}>

          </Card></Col>
          <Col {...firstRowCol}><Card title={<Statistic title='运营结果' value={112983} prefix={'￥'} />} footer={<span>转化率 80.9%</span>}>

          </Card></Col>
        </Row>

      </div>
    )
  }
}
