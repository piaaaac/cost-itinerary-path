import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
require('bootstrap-webpack2!./bootstrap.config.js')
require('./style.scss')

ReactDOM.render(
  <App /> ,
  document.getElementById('root')
)