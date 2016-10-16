import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class Spinner extends Component {
  render () {
    const classes = classNames({
      'is-dark': this.props.isDark
    })

    return (
      <div className={ classes }>
        <h1 className="spinner">❍</h1>
      </div>
    )
  }
}

Spinner.displayName = 'Spinner'

Spinner.propTypes = {
  isDark: PropTypes.bool
}
