import React from 'react'
import { csv, json } from 'd3-request'
import moment from 'moment'
import $ from 'jquery'
import _ from 'lodash'
import Header from './Header'
import Left from './Left'
import Right from './Right'

/* --------------------------
Header
Left
  MatrixPath
  MatrixLetters
Right
  Map
  MapPath
  MapLetters




hover matrix real place
lettere da a stesso posto
zoom temporale preciso (non data dependent)
lettere aggregate vs singole
line style

addressee INCLUDES ccccccc




-------------------------- */

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      letters: [],
      places: [],
      worldTopology: null,
      dateFilter: [],
      // dateFilter: ['1641-01-01', '1643-12-31'],
      placeFilter: [],
      hovered: null
    }
    this.parsePlace = this.parsePlace.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.setTimeFilter = this.setTimeFilter.bind(this)
    this.showHoveredDate = this.showHoveredDate.bind(this)
  }

  // fromTo: [YYYY-M-D, YYYY-M-D]
  setTimeFilter (fromTo) {
    this.setState({dateFilter: fromTo})
  }

  showHoveredDate (date, x) {
    const placesAndDistance = this.state.places.map(e => {
      var diff = moment(date).diff(e.date, 'days')
      return Object.assign({}, e, {distanceDays: diff})
    })
    const sortedPAD = _.sortBy(placesAndDistance, e => {
      if(e.distanceDays < 0) return Infinity
      else return e.distanceDays
    })
    const nearestPlace = sortedPAD[0]
    $('#hover-line-matrix')
      .attr('x1', x)
      .attr('x2', x)
    console.log('nearestPlace', nearestPlace.place)
    if(this.state.hovered === null || this.state.hovered.place !== nearestPlace.place){
      this.setState({hovered: nearestPlace})
    }
  }

  componentDidMount () {
    const rootURL = '.'
    const comp = this
    csv(rootURL + '/data/letters-tmp.csv', function(err, data) {
      const parsed = data.map(d => comp.parseLetter(d))
      console.log('parsed letters', parsed)
      comp.setState({letters: parsed})
    })
    csv(rootURL + '/data/placesss.csv', function(err, data) {
      const parsed = data.map(d => comp.parsePlace(d))
      // const sorted = parsed.sort((a,b) => a.date.isBefore(b.date))
      comp.setState({places: parsed})
      // comp.setState({places: sorted})
    })
    // json(rootURL + '/data/world-110m.v1.json', function(err, data) {
    json(rootURL + '/data/world-50m.json', function(err, data) {
      comp.setState({worldTopology: data})
    })

    // RESIZE
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    clearTimeout(this.doResize)
    this.doResize = setTimeout(this.forceUpdate(), this.resizeDelta)
  }

  parsePlace (d) {
    // coordinates
    const c = d.coordinates.split(', ')
    const co = {
      lon: +c[1],
      lat: +c[0]
    }
    
    // date
    const YYYY = d.year
    let M = d.month.trim()
    let D = d.day.trim()
    const dateString = YYYY +'-'+ M +'-'+ D
    const date = moment(dateString, 'YYYY-M-D')
    if(!date.isValid()){
      alert('invalid date: ', d)
    }

    return Object.assign({}, d, {
      coordinates: co,
      date: date
    })
  }

  parseLetter (d) {
    // coordinates
    let c = d.coordinatesFrom.split(', ')
    const coF = {
      lon: +c[1],
      lat: +c[0]
    }
    c = d.coordinatesTo.split(', ')
    const coT = {
      lon: +c[1],
      lat: +c[0]
    }
    
    // date
    const YYYY = d.year
    let M = d.month.trim()
    let D = d.day.trim()
    const dateString = YYYY +'-'+ M +'-'+ D
    const date = moment(dateString, 'YYYY-M-D')
    if(!date.isValid()){
      console.log('invalid date: ', d.year,d.month,d.day)
      alert('invalid date: ', d.year,d.month,d.day)
    }

    return Object.assign({}, d, {
      coordinatesFrom: coF,
      coordinatesTo: coT,
      date: date
    })
  }

  render () {
      
    const filteredPlaces = this.state.places.filter(e => {
      if(this.state.dateFilter.length === 0) return true
      const from = moment(this.state.dateFilter[0], 'YYYY-M-D')
      const to = moment(this.state.dateFilter[1], 'YYYY-M-D')
      return e.date.isBetween(from, to)
    })

    const filteredLetters = this.state.letters.filter(e => {
      if(this.state.dateFilter.length === 0) return true
      const from = moment(this.state.dateFilter[0], 'YYYY-M-D')
      const to = moment(this.state.dateFilter[1], 'YYYY-M-D')
      return e.date.isBetween(from, to)
    })

    const propsHeader = {
      setTimeFilter: this.setTimeFilter
    }
    const propsLeft = {
      showHoveredDate: this.showHoveredDate,
      places: filteredPlaces,
      letters: filteredLetters
    }
    const propsRight = {
      worldTopology: this.state.worldTopology,
      hovered: this.state.hovered,
      places: filteredPlaces,
      letters: filteredLetters
    }
    
    return (
      <div className='appp'>

        <Header {...propsHeader} />
        
        <div className='appp-main container-fluid'>
          <div className='row'>

            <Left {...propsLeft} />
            <Right {...propsRight} />

          </div>
        </div>

      </div>
    )
  }
}

export default App