import React, { Component, PropTypes } from 'react'

import mapObject from '../utils/map-object'
import formatTime from '../utils/format-time'

export default class DepartureItem extends Component {
  render () {
    const { platform, index, isDark } = this.props

    return (
      <div
        key={ index }
        className="inner-flex"
        style={{ borderColor: (isDark) ? '#444' : '#FFF' }}
      >
        <h1>{ index }</h1>
        { mapObject(platform, (station) => {
          return (
            <div className="departure-item" key={ station }>
              <h3>{ station }</h3>
              { platform[station].map((time, key) => {
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
