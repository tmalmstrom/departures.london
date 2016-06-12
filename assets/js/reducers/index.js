import { combineReducers } from 'redux'

import departures from './departures'
import filteredStations from './filtered-stations'
import lines from './lines'
import stations from './stations'
import stationsOnLines from './stations-on-lines'

export default combineReducers({
  departures,
  filteredStations,
  lines,
  stations,
  stationsOnLines
})
