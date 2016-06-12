/**
 * Loop through an object as you were using Array.map()
 *
 * @param {object} object - object to map
 * @param {function} cb - callback
 */
export default function mapObject (object, cb) {
  return Object.keys(object).map((key) =>  cb(key, object[key]))
}
