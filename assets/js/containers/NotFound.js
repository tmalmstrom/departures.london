import React, { Component } from 'react'

export default class NotFound extends Component {
  render () {
    return (
      <div className="four-one-four">
        <h1>404 - Page not found</h1>
        <p>Alternatively, this page can be used for real-time updates on Southern Rails arrival times</p>

        <p>Trains on time:</p>
        <p>ERROR: NOTHING TO DISPLAY</p>
      </div>
    )
  }
}

NotFound.displayName = 'NotFound'
