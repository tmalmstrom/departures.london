import {
  DEPARTURES_FETCHING,
  DEPARTURES_SUCCESS,
  DEPARTURES_RESET
} from '../constants/index'

export default function departures (state = { }, action) {
  switch (action.type) {
    case DEPARTURES_FETCHING:
      return {
        ...action.departures,
        isFetching: true
      }

    case DEPARTURES_SUCCESS:
      return action.departures

    case DEPARTURES_RESET:
      return { }

    default:
      return state
  }
}
