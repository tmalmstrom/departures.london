import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { getLineStatuses } from '../actions/index'

import IndexItem from '../components/index-item'
import mapObject from '../utils/map-object'

export class Index extends Component {
  componentDidMount () {
    this.props.dispatch(getLineStatuses())
  }

  render () {
    const { lines } = this.props,
          classes = classNames({
            'index': true,
            'has-children': this.props.children
          })

    return (
      <div className={ classes }>
        <div className={ 'full-height' }>
          { mapObject(lines, (key, value) => <IndexItem key={ key } line={ value } /> ) }
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

Index.displayName = 'Index'

Index.propTypes = {
  lines: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  const { lines } = state

  return {
    lines
  }
}

export default connect(mapStateToProps)(Index)
