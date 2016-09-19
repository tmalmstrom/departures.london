/*eslint-disable */
import {
  chain,
  filter,
  sortBy,
  forEach
} from 'lodash'
/*eslint-enable */

import {
  FILTERED_STATIONS_SUCCESS,

  DEPARTURES_FETCHING,
  DEPARTURES_SUCCESS,
  DEPARTURES_RESET,

  LINE_STATUSES_SUCCESS
} from '../constants/index'

import { API_URL } from './../../../config/api'

/**
 * Gathers sorted stations based off which line is entered.
 * Filters the json data that holds an array of station IDs,
 *
 * @param {string} line - used to specify which subset of stations to find
 * @returns {function} - success or failure dispatch
 */
export function getFilteredSortedStations (line) {
  return (dispatch, getState) => {
    const { stations, stationsOnLines } = getState()

    const filteredStations =
      chain(stations)
        .filter((station) => ~stationsOnLines[line].indexOf(station.id) ? station : null)
        .sortBy((station) => station.title).value()

    return dispatch(successFilteredStations(filteredStations))
  }
}

/**
 * Succesfully return the filtered stations
 *
 * @param {array} filteredStations - array of objects containing station data
 * @returns {object}
 */
export const successFilteredStations = (filteredStations) => ({
  type: FILTERED_STATIONS_SUCCESS,
  filteredStations
})

/**
 * API call to fetch the departure times for the specified line and station.
 *
 * @param {string} line
 * @param {string} stationId
 * @returns {object} result of API call, a JSON object with departure data, blank data or error message.
 */
export const getDepartures = (line, stationId) => {
  //Syntax sugar for the user so we can have an /overground/ url
  //backend api requires `/london-overground`, because.
  if (line === 'overground') line = 'london-overground'

  return (dispatch) => {
    dispatch(fetchingDepartures())

    return fetch(`${ API_URL }/${ line }/${ stationId }`)
      .then(res => res.json())
      .then(data => dispatch(successDepartures(data)))
      .catch((err) => console.error(err))
  }
}

/**
 * Intermediary state between requesting departures and receiving them.
 *
 * @returns {object}
 */
const fetchingDepartures = () => ({
  type: DEPARTURES_FETCHING
})

/**
 * API call succesfully returned data.
 *
 * @param {array} departures - array of objects containing departure data
 * @returns {object}
 */
const successDepartures = (departures) => ({
  type: DEPARTURES_SUCCESS,
  departures
})


/**
 * Reset the departures to initialState (used when the user navigates and so forth).
 *
 * @returns {object}
 */
export const resetDepartures = () => ({
  type: DEPARTURES_RESET
})


/**
 * Fetch line statuses from API
 *
 * @returns {object}
 */
export const getLineStatuses = () => {
  return (dispatch) => {
    return fetch(`${ API_URL }/statuses`)
      .then(res => res.json())
      .then(data => dispatch(successLineStatuses(data)))
      .catch((err) => console.error(err))
  }
}

/**
 * API call succesfully returned line status data
 *
 * @param {object} statuses - line statuses
 * @returns {object}
 */
export const successLineStatuses = (statuses) => ({
  type: LINE_STATUSES_SUCCESS,
  statuses
})
