import React from 'react'

export default function MatrixPath({
  xScale,
  yScale,
  places
}){
  const lines = []
  places.forEach((e, i, a) => {
    if(i > 0){
      const lineVProps = {
        key: 'line-'+ i,
        id: 'line-'+ i,
        className: "svg-path-line vertical" + (e.type.trim() === 'S' ? ' small-trip' : ''),
        x1: xScale(e.date),
        x2: xScale(e.date),
        y1: yScale(a[i-1].place),
        y2: yScale(e.place),
      }
      lines.push(<line {...lineVProps} />)
    // }
    // if(i < (a.length - 1)){
      const lineHProps = {
        key: 'line-to-'+ i,
        id: 'line-to-'+ i,
        className: "svg-path-line horizontal" + (a[i-1].type.trim() === 'S' ? ' small-trip' : ''),
        x1: xScale(a[i-1].date),
        x2: xScale(e.date),
        y1: yScale(a[i-1].place),
        y2: yScale(a[i-1].place),
      }
      lines.push(<line {...lineHProps} />)
    }
  })
  return (
    <g className="svg-path-lines">
      {lines}
    </g>
  )
}
