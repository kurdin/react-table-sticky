import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import App2 from './App2'
import App3 from './App3'

// load all rows into the scrolling table
ReactDOM.render(<App />, document.getElementById('root'))

// load rows with @react-libraries/virtual-window 
// ReactDOM.render(<App2 />, document.getElementById('root'))

// load all rows and display those with paganition
// ReactDOM.render(<App3 />, document.getElementById('root'))
