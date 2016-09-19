import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router'

import StationItem from '../components/station-item'
import * as actions from '../actions/index'

export class Stations extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const { getFilteredSortedStations } = this.props,
          { line }  = this.props.params

    getFilteredSortedStations(line)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.params.line != this.props.params.line) {
      const { getFilteredSortedStations } = this.props,
            { line }  = this.props.params

      getFilteredSortedStations(line)
    }
  }

  render () {
    const { lines, filteredStations } = this.props,
          { line } = this.props.params,
          { isDark } = lines[line], //@todo this errors if no line is found
          style = {
            background: lines[line].color
          },
          classes = classNames({
            'full-height': true,
            'stations': true,
            'is-dark': isDark,
            'has-children': this.props.children
          })

    let element

    if (filteredStations) {
      element = (
        filteredStations.map((value, index) => {
          return  <StationItem key={ index } station={ value } line={ line } bg={ lines[line].colorLight } />
        })
       )
    } else {
      element = (
        //@todo error handling, should give them a link to start again
        <p>No stations</p>
      )
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="slide-in"
        transitionAppear={ true }
        transitionAppearTimeout={ 700 }
        transitionLeaveTimeout={ 0 }
        transitionEnterTimeout={ 0 }>
        <div className={ classes } style={ style }>
          <Link className="back" to={ `/${ line }` }>&lt;</Link>
          <div className="u-scroll-wrapper">
            { element }
            { this.props.children }
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

Stations.displayName = 'Stations'

Stations.propTypes = {
  params: PropTypes.shape({
    line: PropTypes.string.isRequired
  }),
  lines: PropTypes.object.isRequired,
  filteredStations: PropTypes.array.isRequired,
  getFilteredSortedStations: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { filteredStations, lines, stations, stationsOnLines } = state

  return {
    filteredStations,
    lines,
    stations,
    stationsOnLines
  }
}

export default connect(mapStateToProps, actions)(Stations)
