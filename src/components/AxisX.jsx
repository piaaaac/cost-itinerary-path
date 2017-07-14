import React from 'react'
import { select } from 'd3-selection'
import { timeYear } from 'd3-time-format'
import { axisTop } from 'd3-axis'
import { scaleTime } from 'd3-scale'
import { scaleLinear } from 'd3-scale'


// alternative method for d3 modules
// const d3 = Object.assign({}, require('d3-selection'), require('d3-time-format'), require('d3-scale'), require('d3-axis'))

/*--------------------------
props = {
  xScale - scaleTime - with domain & range set
  translate – [x, y]
}
--------------------------*/

export default class AxisX extends React.Component {
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    var node = this.axisX
    var axis = axisTop(this.props.xScale).ticks(timeYear)
    select(node).call(axis)
    // alternative method for d3 modules (add "d3.")
    // var axis = d3.axisTop(this.props.xScale).ticks(d3.timeYear)
    // d3.select(node).call(axis)
  }

  render() {
    // console.log('AXIS', this.props)
    return (
      <g className="axis" 
        ref={element => this.axisX = element}
        transform={'translate('+ this.props.translate[0] +', '+ this.props.translate[1] +')'}
        ></g>
    )
  }
}
