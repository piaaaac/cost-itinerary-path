import React from 'react'

export default function MapLetters({
  projection,
  letters
}){
  const circles = letters.map((e, i) => {
    const type = (e.creator.indexOf('CCCCCC') !== -1) ? 'sent' : 'received'
    // const type = (e.creator === 'CCCCCC') ? 'sent' : 'received'
    const co = (type === 'sent') ? e.coordinatesTo : e.coordinatesFrom
    const coo = [co.lon, co.lat]
    const circleProps = {
      key: 'circle-'+ i,
      className: "svg-letters-circle "+ type,
      cx: projection(coo)[0],
      cy: projection(coo)[1],
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