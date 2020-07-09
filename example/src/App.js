import React from 'react'

import useCrowdhound from 'react-crowdhound'
import logo from './logo.svg';
import NewsFeed from 'react-crowdhound/lib/NewsFeed'
import './App.scss';


const App = () => {
  useCrowdhound({
    version: '2.0',
    protocol: 'http',
    host: 'uat.crowdhound.io',
    port: 80,
    apikey: 'API11OHHOKHGFQ0OYEZZZM7I79OF7',
    debug: true
  })

  return <div id="app">
    <div className="header-bar">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Crowdhound testing</h1>
    </div>
    <NewsFeed />
  </div>
}

export default App
