import React from 'react'

export default function MapLetters({
  projection,
  letters
}){
  const circles = letters.map((e, i) => {
    const type = (e.creator === 'CCCCCC') ? 'sent' : 'received'
    const co = (type === 'sent') ? e.coordinatesTo : e.coordinatesFrom
    const coo = [co.lon, co.lat]
    const circleProps = {
      key: 'circle-'+ i,
      className: "svg-circle",
      cx: projection(coo)[0],
      cy: projection(coo)[1],
      r: 3,
    }
    return (<circle {...circleProps} />)
  })
  return (
    <g className="svg-circles">
      {circles}
    </g>
  )
}