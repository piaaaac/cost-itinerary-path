import React from 'react'
import moment from 'moment'
import { scaleTime, scaleLinear, scaleBand, scalePow } from 'd3-scale'
import { brushX } from 'd3-brush'
import MatrixPath from './MatrixPath'
import MatrixLetters from './MatrixLetters'
import AxisX from './AxisX'

const GridLine = ({x1, x2, y, name}) => {
  const lprops = { x1:x1, x2:x2, y1:y, y2:y, className: 'svg-grid-line' }
  return(
    <g className="svg-grid-line">
      <line {...lprops} />
    </g>
  )
}

const GridName = ({x1, x2, y, name}) => {
  const txtprops = { x:0, y:y, y2:y }
  return(
    <g className="svg-grid-name">
      <text {...txtprops}>{name}</text>
    </g>
  )
}

// places
// showHoveredDate

export default class Left extends React.Component{
  constructor (props) {
    super(props)
    this.containerNode = null
    // this.handleBrushStart = this.handleBrushStart.bind(this)
    // this.handleBrushEnd = this.handleBrushEnd.bind(this)
    // this.handleBrushChange = this.handleBrushChange.bind(this)
    this.handleMatrixMouse = this.handleMatrixMouse.bind(this)
  }

  componentDidMount () {
    console.log('brushX', brushX)
  }

  // https://github.com/rszewczyk/react-brush
  /*
  The callbacks will receive a single object parameter with the following type:
  {
    x: number,       // x and y represent the top left corner of the selected region relative
    y: number,       // to the origin of the svg's viewable area
    width: number,   // the width and height of selected region
    height: number,  
  }
  */
  
  // handleBrushStart (brush) { 
  //   console.log('BRUSH Start', brush)
  // }
  // handleBrushEnd (brush) { 
  //   console.log('BRUSH End', brush)
  // }
  // handleBrushChange (brush) { 
  //   console.log('BRUSH Change', brush)
  // }

  // https://stackoverflow.com/a/3011466/2501713
  handleMatrixMouse(e, xScale){
    // console.log('mousemove', e)

    var tempX = 0
    // var tempY = 0

    if (false) { // grab the x-y pos.s if browser is IE
    // if (IE) { // grab the x-y pos.s if browser is IE
      tempX = event.clientX + document.body.scrollLeft
      tempY = event.clientY + document.body.scrollTop
    }
    else {  // grab the x-y pos.s if browser is NS
      tempX = e.pageX
      // tempY = e.pageY
    }  

    if (tempX < 0){ tempX = 0 }
    // if (tempY < 0){tempY = 0}  

    tempX -= 15

    // console.log('mousemove', tempX)
    const hoveredDate = xScale.invert(tempX)
    
    // console.log('mousemove', hoveredDate)
    this.props.showHoveredDate(hoveredDate, tempX)

    // document.Show.MouseX.value = tempX    //MouseX is textbox
    // document.Show.MouseY.value = tempY    //MouseY is textbox

    return true
  }

  render () {
    const places = this.props.places
    const letters = this.props.letters
    // console.log('places', places)
    const readyToDisplay = (this.containerNode !== null)
    let propsMatrixPath = {}
    let propsMatrixLetters = {}
    let propsAxis = {}
    let gridLines = []
    let gridNames = []
    let matrixBg, xScale, yScale, propsHoverLine

    if(readyToDisplay){
      const margins = {top: 50, right: 20, bottom: 20, left: 120}
      const width = this.containerNode.clientWidth - 30
      const height = this.containerNode.clientHeight

      const dates = places.map(e => e.date)
      const minDate = moment.min(dates)
      const maxDate = moment.max(dates)

      xScale = scaleTime()
        .domain([minDate.toDate(), maxDate.toDate()])
        .range([margins.left, width - margins.right])
      // console.log('minDate', minDate)
      // console.log('maxDate', maxDate)

      const allPlaces = []
      places.forEach(e => {
        if(!allPlaces.includes(e.place)) allPlaces.push(e.place)
      })
      yScale = scaleBand()
        .domain(allPlaces)
        .range([margins.top, height - margins.bottom])
      // console.log('yScale', yScale)
      // console.log('yScale("Amsterdam")', yScale("Amsterdam"))

      const propsMatrixBg = {
        x: xScale(xScale.domain()[0]),
        y: yScale(yScale.domain()[0]),
        width: xScale.range()[1],
        height: yScale.range()[1],
        className: 'matrix-bg'
      }
      matrixBg = (<rect {...propsMatrixBg} />)

      gridLines = allPlaces.map((e, i) => {
        // console.log(e)
        const propsGridLine = {
          key: 'g-l-' + i,
          x1: xScale(xScale.domain()[0]),
          x2: xScale(xScale.domain()[1]),
          y: yScale(e),
          name: e
        }
        return <GridLine {...propsGridLine} /> 
      })
      gridNames = allPlaces.map((e, i) => {
        // console.log(e)
        const propsGridName = {
          key: 'g-l-' + i,
          x1: xScale(xScale.domain()[0]),
          x2: xScale(xScale.domain()[1]),
          y: yScale(e),
          name: e
        }
        return <GridName {...propsGridName} /> 
      })

      propsMatrixPath = {
        xScale,
        yScale,
        places
      }
      propsMatrixLetters = {
        xScale,
        yScale,
        letters
      }
      propsAxis = {
        xScale: xScale,
        translate: [0, 30]
      }
      propsHoverLine = {
        x1: xScale(moment('1600-01-01')),
        x2: xScale(moment('1600-01-01')),
        y1: yScale.range()[0],
        y2: yScale.range()[1]
      }
      console.log(propsHoverLine)
    }
    
    return (
      <div className='col-sm-6 appp-left' ref={e => this.containerNode = e}>

        <svg>
          { readyToDisplay && <AxisX {...propsAxis} /> }
          { readyToDisplay && <g className="svg-grid-names">{gridNames}</g> }
          { readyToDisplay && 
            <g className="svg-grid-lines" onMouseMove={e => this.handleMatrixMouse(e, xScale)}>
              {matrixBg}
              {gridLines}
            }
            </g> 
          }
          { readyToDisplay && <MatrixPath {...propsMatrixPath} /> }
          { readyToDisplay && <MatrixLetters {...propsMatrixLetters} /> }
          
          { readyToDisplay &&
            <line id="hover-line-matrix" {...propsHoverLine} />
          }

        </svg>

      </div>
    )
  }
}