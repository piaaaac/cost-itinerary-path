import React from 'react'

export default function MatrixLetters({
  xScale,
  yScale,
  letters
}){
  const circles = letters.map((e, i) => {
    const type = (e.creator === 'CCCCCC') ? 'sent' : 'received'
    const place = (type === 'sent') ? e.cityTo : e.cityFrom
    const circleProps = {
      key: 'circle-'+ i,
      className: "svg-circle",
      cx: xScale(e.date),
      cy: yScale(place),
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