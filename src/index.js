import React from 'react'
import Crowdhound from './components'
import './index.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const AppComponent = (props) => {
  return (
    <div id='app'>
      <Crowdhound {...props} />
    </div>
  )
}

export default AppComponent
