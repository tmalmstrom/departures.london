/*eslint-disable */
import {
  chain,
  filter,
  sortBy,
} from 'lodash'
/*eslint-enable */

import { FILTERED_STATIONS_SUCCESS } from '../constants/index'

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
 *  * Succesfully return the filtered stations
 *   *
 *    * @param {array} filteredStations - array of objects containing station data
 *     * @returns {object}
 *      */
export const successFilteredStations = (filteredStations) => ({
  type: FILTERED_STATIONS_SUCCESS,
  filteredStations
})
