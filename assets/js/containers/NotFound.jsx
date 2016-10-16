import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NotFound extends Component {
  render () {
    return (
      <div className="four-one-four">
        <h2>Uh-oh. You're lost!</h2>
        <Link to="/" className="link">
          Click here to return safely home
        </Link>

        <br />
        <br />

        <p>Alternatively, this page can be used for real-time updates for Southern Rail's services. 🖕</p>
      </div>
    )
  }
}

NotFound.displayName = 'NotFound'
