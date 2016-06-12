import { chain, filter, sortBy, forEach } from 'lodash' // eslint-disable-line
import 'whatwg-fetch'

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
function successFilteredStations (filteredStations) {
  return {
    type: FILTERED_STATIONS_SUCCESS,
    filteredStations
  }
}

/**
 * API call to fetch the departure times for the specified line and station.
 *
 * @param {string} line
 * @param {string} stationId
 * @returns {object} result of API call, a JSON object with departure data, blank data or error message.
 */
export function getDepartures (line, stationId) {
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
function fetchingDepartures () {
  return {
    type: DEPARTURES_FETCHING
  }
}

/**
 * API call succesfully returned data.
 *
 * @param {array} departures - array of objects containing departure data
 * @returns {object}
 */
function successDepartures (departures) {
  return {
    type: DEPARTURES_SUCCESS,
    departures
  }
}


/**
 * Reset the departures to initialState (used when the user navigates and so forth).
 *
 * @returns {object}
 */
export function resetDepartures () {
  return { type: DEPARTURES_RESET }
}


export function getLineStatuses () {
  return (dispatch) => {
    return fetch(`${ API_URL }/statuses`)
      .then(res => res.json())
      .then(data => dispatch(successLineStatuses(data)))
      .catch((err) => console.error(err))
  }
}

export function successLineStatuses (statuses) {
  return {
    type: LINE_STATUSES_SUCCESS,
    statuses
  }
}
