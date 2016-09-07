import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class StationItem extends Component {
  render () {
    const { title, url } = this.props.station,
          { line, bg } = this.props,
          activeStyle = {
            background: bg,
            fontWeight: 'bold'
          }

    return (
      <div>
        <Link
          to={ `\/${ line }/${ url }` }
          activeStyle={ activeStyle }
          className="station-item">
          { title }
        </Link>
      </div>
    )
  }
}

StationItem.displayName = 'StationItem'

StationItem.propTypes = {
  bg: PropTypes.string.isRequired,
  line: PropTypes.string.isRequired,
  station: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
}
