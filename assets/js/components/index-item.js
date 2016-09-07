import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

export default class IndexItem extends Component {
  render () {
    const { line } = this.props,
          classes = classNames({
            'index-item': true,
            'is-dark': line.isDark
          })

    return (
      <Link
        to={ `\/${ line.url }` }
        className={ classes }
        style={{ background: line.color }}>
          { line.title }
          { line.status &&
            <span> { line.status } </span>
          }
      </Link>
    )
  }
}

IndexItem.displayName = 'IndexItem'

IndexItem.propTypes = {
  line: PropTypes.object.isRequired
}
