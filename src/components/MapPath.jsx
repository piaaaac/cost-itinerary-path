import React from 'react'
import $ from 'jquery'

// function animate () {
//   document.
// }

export default function MapPath({
  pathLines,          // {}   pathLine, place
  scaleGeo            // scale of type d3.geopath (?)
}){
  // console.log('pathLines', pathLines)

  const path = pathLines.map((e, i) => {
    const lineProps = {
      key: 'line-'+ i,
      id: 'line-'+ i,
      className: "svg-path-line animate-delay map" + (e.place.type.trim() === 'S' ? ' small-trip' : ''),
      // className: "svg-path-line animate-delay",
      d: scaleGeo(e.pathLine.geometry),
      // "data-delay": i * 200
      onLoad: function(){
        setTimeout(function(){
          console.log(this)
          this.style.opacity = 1
        }, i * 200)
      }
    }
    return <path {...lineProps} />
  })
  return (
    <g className="svg-path-lines">
      {path}
    </g>
  )
}





