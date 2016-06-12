/**
 * Sorts keys
 * re-assigns
 */
module.exports = (obj) => {
  return Object.keys(obj).sort().reduce((r, k) => (r[k] = obj[k], r), {})
}
