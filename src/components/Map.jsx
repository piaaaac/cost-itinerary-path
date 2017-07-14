import React from 'react'
// import * as d3 from 'd3'
import * as topojson from 'topojson'

export default function Map({
  worldTopology,     // map shapes
  scaleGeo            // scale of type d3.geopath (?)
}){
  // console.log('worldTopology', worldTopology)

  const worldFeature = topojson.feature(worldTopology, 
    worldTopology.objects.countries)
  
  // console.log('worldFeature', worldFeature)

  // const svgMap = <path d={geoPath(worldFeature.features)} />

  const svgMap = worldFeature.features.map((e, i) => {
    const unique = 'tmp-'+ i
    return <path key={i} 
      className="svg-map"
      d={scaleGeo(e)} />
  })


  return (
    <g className="svg-map">
      {svgMap}
    </g>
  )
}