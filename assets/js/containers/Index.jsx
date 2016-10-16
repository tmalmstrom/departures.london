import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

import * as indexActions from '../actions/index'

import IndexItem from '../components/index-item.jsx'
import mapObject from '../utils/map-object'

export class Index extends Component {
  componentDidMount () {
    this.props.actions.getLineStatuses()
  }

  render () {
    const { lines } = this.props,
          classes = classNames({
            'index': true,
            'has-children': this.props.children
          })

    return (
      <div className={ classes }>
        <div className="full-height">
          { mapObject(lines, (key, value) => <IndexItem key={ key } line={ value } />) }
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

const mapStateToProps = (state) => ({
  lines: state.lines
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(indexActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
