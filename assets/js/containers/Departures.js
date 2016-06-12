import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { find, isEqual, isEmpty } from 'lodash'
import classNames from 'classnames'

import { getDepartures, resetDepartures } from '../actions/index'
import DepartureItem from '../components/departure-item'
import Spinner from '../components/spinner'
import mapObject from '../utils/map-object'

export class Departures extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)
  }

  routerWillLeave () {
    this.props.dispatch(resetDepartures())
  }

  componentDidMount () {
    const { filteredStations } = this.props,
          { line, station } = this.props.params,
          { router } = this.context

    router.setRouteLeaveHook(this.props.route, ::this.routerWillLeave)

    this.getDepartures(filteredStations, line, station)
  }

  //@todo OPTOMISE && ERROR CONTROL
  componentWillReceiveProps (nextProps) {
    //Ensure that the user hasn't just clicked on the same station
    if (
        !isEqual(nextProps.params.station, this.props.params.station)
        ||
        !isEqual(nextProps.filteredStations, this.props.filteredStations)
    ) {
      const { filteredStations } = nextProps,
            { line, station } = nextProps.params

      this.getDepartures(filteredStations, line, station)
    }
  }

  getDepartures (filteredStations, line, station) {
    const { dispatch } = this.props

    const foundStation = find(filteredStations, (st) => st.url === station)

    //@todo error handling if no stations found (URL error more likely)
    if (foundStation) return dispatch(getDepartures(line, foundStation.id))
  }

  render () {
    const { departures, lines } = this.props,
          { line } = this.props.params,
          { isDark } = lines[line],
          classes = classNames({
            'is-dark': isDark,
            'departures': true
          }),
          style = {
            background: lines[line].colorLight
          }

    return (
      <div className={ classes } style={ style }>
        { this.renderContent(departures, isDark) }

        <p className={ 'sticky-bottom' }>Made by <a href="http://tomspeak.co.uk">Tom Speak</a> | <a href="http://github.com/tomspeak/departures.london">Github</a></p>
      </div>
    )
  }

  renderContent (departures, isDark) {
    if (!isEmpty(departures) && !departures.isFetching) {
      return (
        <div className={ 'flex' }>
          { mapObject(departures, (index, platform) => {
            return <DepartureItem platform={ platform } index={ index } key={ index } />
          }) }
        </div>
      )
    } else if (departures.isFetching) {
      return <Spinner isDark={ isDark } />
    } else {
      return ( <p>Oh jeez, there are no trains I am afraid.</p> )
    }
  }
}

Departures.displayName = 'Departures'

Departures.propTypes = {
  departures: PropTypes.object.isRequired,
  filteredStations: PropTypes.array.isRequired,
  lines: PropTypes.object.isRequired,
  params: PropTypes.shape({
    line: PropTypes.string.isRequired,
    station: PropTypes.string.isRequired
  }),
  route: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  const { departures, countdown, filteredStations, lines } = state

  return {
    countdown,
    departures,
    filteredStations,
    lines
  }
}

export default connect(mapStateToProps)(Departures)
