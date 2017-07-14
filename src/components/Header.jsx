import React from 'react'

export default function Header({
  setTimeFilter             // ()
}){
  const tmpFiltersData = [
    {filter: ['1592-1-1', '1614-12-31'], text: 'A'},
    {filter: ['1615-1-1', '1628-1-31'], text:  'B'},
    {filter: ['1628-2-1', '1641-8-31'], text:  'C'},
    {filter: ['1641-9-1', '1648-12-31'], text: 'D'},
    {filter: ['1649-1-1', '1654-12-31'], text: 'E'},
    {filter: ['1654-1-1', '1656-12-31'], text: 'F'},
    {filter: ['1657-1-1', '1671-1-1'], text:   'G'}
  ]
  
  const tmpFilters = tmpFiltersData.map((e, i) => (
    <a className="tmp-filters" key={'sf'+ i} href="javascript:;" onClick={() => setTimeFilter(e.filter)}>
      {e.text}
    </a>
  ))

  return (
    <div className='appp-header container-fluid'>
      <div className='row'>
        <div className='col-sm-12'>
          Itinerant lorem ipsum Comenuis

          {tmpFilters}

        </div>
      </div>
    </div>
  )
}