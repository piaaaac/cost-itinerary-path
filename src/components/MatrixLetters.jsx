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
      className: "svg-letters-circle "+ type,
      cx: xScale(e.date),
      cy: yScale(place),
      r: 3,
      onClick: () => console.log('letter:', e)
    }
    return (
      <circle {...circleProps}>
        <title>
          {(
            type === 'sent' 
              ? 'Letter to ' + e.addressees
              : 'Letter from ' + e.creator
          ) +' ('+ e.date.format('DD MMM YYYY') +')'}
        </title>
      </circle>
    )
  })
  return (
    <g className="svg-letters-circles">
      {circles}
    </g>
  )
}