const routes = require('./../config/routes')

/**
 * This will route match against our regex, simply checking
 * to ensure they are following the constraints specified by
 * react-router, otherwise we can handle 404s. See `routes`
 * for regex explanation.
 *
 * @param {string} url - url to match regex against.
 * @returns {bool} whether or not the url matches the supplied regex.
 */
module.exports = (url) => routes.some((routes) => url.match(routes))
