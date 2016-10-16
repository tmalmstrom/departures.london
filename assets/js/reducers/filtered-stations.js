import { FILTERED_STATIONS_SUCCESS } from '../constants/index'

export default function filteredStations (state = [], action) {
  switch (action.type) {
    case FILTERED_STATIONS_SUCCESS:
      return action.filteredStations

    default:
      return state
  }
}
