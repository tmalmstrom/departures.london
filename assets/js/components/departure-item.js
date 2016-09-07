import React, { Component, PropTypes } from 'react'

import mapObject from '../utils/map-object'
import formatTime from '../utils/format-time'

export default class DepartureItem extends Component {
  render () {
    const { platform, index } = this.props

    return (
      <div key={ index } className="inner-flex">
        <h1>{ index }</h1>
        { mapObject(platform, (key) => {
          return (
            <div className="departure-item" key={ key }>
              <h3>{ key }</h3>
              { platform[key].map((time, key) => {
                return (
                  <p className="departure-item__content" key={ key }>{ formatTime(time) }</p>
                )
              }) }
            </div>
          )
        }) }
      </div>
    )
  }
}

DepartureItem.displayName = 'DepartureItem'

DepartureItem.propTypes = {
  platform: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired
}
