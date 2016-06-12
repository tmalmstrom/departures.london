import { AT_PLATFORM, DUE, ARRIVING } from './../../../config/strings'

/**
 * Formats the unforgiving `180` second form returned from the TFL API into a user friendly one: `3m',
 * IF the time left is 0, the string `At Platform` will be used instead of a time.
 * IF the time is less than 30 seconds, it'll say 'Arriving'
 * IF the time is less than 1 minute it'll say 'Due'
 *
 * @param {number} timeToStation - Time (in seconds) until the train reaches the platform.
 * @returns {string} Formatted string in minutes.
 */
export default (timeToStation) => {
  if (timeToStation === 0) {
    return AT_PLATFORM
  }

  if (timeToStation <= 60 && timeToStation > 30) {
    return DUE
  }

  if (timeToStation < 30) {
    return ARRIVING
  }

  let minutes = Math.floor(timeToStation / 60)

  return `${ minutes }min`
}
