import React from 'react'
import turf from 'turf'
import { geoPath, geoMercator } from 'd3-geo'
import * as topojson from 'topojson'
import Map from './Map'
import MapPath from './MapPath'
import MapLetters from './MapLetters'

  // worldTopology
  // places
  // hovered
  // letters

export default class Right extends React.Component{
  constructor (props) {
    super(props)
    this.containerNode = null
  }

  componentDidMount () {}

  render () {
    const letters = this.props.letters
    const worldTopology = this.props.worldTopology
    const hovered = this.props.hovered
    const places = this.props.places
    const readyToDisplay = (this.containerNode !== null) && (worldTopology !== null)
    let propsMap = {}
    let propsMapPath = {}
    let propsMapLetters = {}
    let propsHoverDot = {}
    let hoverText = {}

    // console.log('readyToDisplay', readyToDisplay)

    if(readyToDisplay){
      
      const margin = 20
      const width = this.containerNode.clientWidth
      const height = this.containerNode.clientHeight
      
      const pathLineString = turf.lineString(this.props.places.map(e => {
        return([e.coordinates.lon, e.coordinates.lat])
      }))
      // console.log('pathLineString', pathLineString)

      const pathLines = []
      this.props.places.forEach((e, i, a) => {
        if(i > 0){
          const p1 = [a[i-1].coordinates.lon, a[i-1].coordinates.lat]
          const p2 = [e.coordinates.lon, e.coordinates.lat]
          const l = turf.lineString([p1,p2])
          pathLines.push({pathLine: l, place: e})
        }
      })
      // console.log('pathLines', pathLines)

      // --- MAP

      const projection = geoMercator().fitExtent(
        // [[margin, margin], [margin+20, margin+20]],
        [[margin, margin], [width - margin, height - margin]],
        pathLineString
      )
      const scaleGeo = geoPath(projection)

      // console.log('scaleGeo', scaleGeo)

      propsMap = {
        worldTopology,
        scaleGeo
      }
      propsMapPath = {
        pathLines,
        scaleGeo
      }
      propsMapLetters = {
        projection,
        letters
      }
    
      if(hovered !== null){
        console.log('hovered', hovered)
        const coo = [hovered.coordinates.lon, hovered.coordinates.lat]
        const x = projection(coo)[0]
        const y = projection(coo)[1]
        propsHoverDot = {
          cx: x,
          cy: y,
        }
        hoverText = {
          text: hovered.place,
          props: {
            x: x,
            y: y - 15,
          }
        }
        console.log('propsHoverDot', propsHoverDot)
      }
    }
    
    return (
      <div className='col-sm-6 appp-right' ref={e => this.containerNode = e}>
        <svg>      
          
          { readyToDisplay && <Map {...propsMap} />}
          
          { readyToDisplay && <MapPath {...propsMapPath} />}
          
          { readyToDisplay && <MapLetters {...propsMapLetters} />}

          { (readyToDisplay && hovered !== null) && 
            <g className="hover-dot-map">
              <circle {...propsHoverDot} />
              <text {...hoverText.props}>{hoverText.text}</text>
            </g>
          }

        </svg>      
      </div>
    )
  }
}