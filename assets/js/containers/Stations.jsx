import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router'

import StationItem from '../components/station-item.jsx'
import * as actions from '../actions/stations'

export class Stations extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const { getFilteredSortedStations } = this.props.actions,
          { line }  = this.props.params

    getFilteredSortedStations(line)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.params.line != this.props.params.line) {
      const { getFilteredSortedStations } = this.props.actions,
            { line }  = this.props.params

      getFilteredSortedStations(line)
    }
  }

  render () {
    const { lines, filteredStations } = this.props,
          { line } = this.props.params,
          { isDark } = lines[line],
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
          return  <StationItem ref={ index } key={ index } station={ value } line={ line } bg={ lines[line].colorLight } />
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
        transitionName="scale-transition"
        transitionAppear={ true }
        transitionEnter={ true }
        transitionLeave={ true }
        transitionAppearTimeout={ 440 }
        transitionLeaveTimeout={ 500 }
        transitionEnterTimeout={ 500 }>
        <div className={ classes } style={ style }>
          <div className="u-scroll-wrapper">
            <div className="title show-mobile">
              <Link to="/">
                &larr;
                <span>Lines</span>
              </Link>
            </div>
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
}

const mapStateToProps = (state) => ({
  filteredStations: state.filteredStations,
  lines: state.lines,
  stations: state.stations,
  stationsOnLines: state.stationsOnLines
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Stations)
