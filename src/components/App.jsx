import React from 'react'
import { csv, json } from 'd3-request'
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
-------------------------- */

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      letters: [],
      places: [],
      worldMap: []
    }
  }

  componentDidMount () {
    const rootURL = '.'
    const comp = this
    csv(rootURL + '/data/letters.csv', function(err, data) {
      comp.setState({letters: data})
    })
    csv(rootURL + '/data/places.csv', function(err, data) {
      comp.setState({places: data})
    })
    json(rootURL + '/data/world-110m.v1.json', function(data) {
      comp.setState({worldMap: data})
    })
  }

  render () {
    return (
      <div className='appp'>

        <Header />
        
        <div className='appp-main container-fluid'>
          <div className='row'>

            <Left />
            <Right />

          </div>
        </div>

      </div>
    )
  }
}

export default App