const request = require('request'),
      sortBy = require('lodash/sortBy'),
      forEach = require('lodash/forEach'),
      isEmpty = require('lodash/isEmpty')

const sortObjectByKey = require('./../utils/sort-object-by-key')

const logger = require('./../utils/logger').api

module.exports = (req, res) => {
  logger.info(req.ip)

  let { line, stationId } = req.params,
      appId = process.env.APP_ID,
      appKey = process.env.APP_KEY,
      url = `https://api.tfl.gov.uk/Line/${ line }/Arrivals?stopPointId=${ stationId }&app_id=${ appId }&app_key=${ appKey }`


  request(url, (err, response) => {
    let departures,
        formattedDepartures = { }

    try {
      //Sometimes TFL sends back really goofy stuff for seemingly no good reason.
      departures = JSON.parse(response.body)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ error: true, message: 'Internal Server Error' })
    }

    //TFL only return a httpStatusCode if there has been an error.
    //I cannot see a reliable way to distinguish between errors or not, this is
    //a lesser of two evils compared to a direct string comparison from their
    //very long API Error String.
    if (departures.httpStatusCode) {
      return res.status(500).send({ message: departures.message })
    }

    //We were succesful, but there's no departures to show. Send an empty result
    //for the front-end to deal with.
    if (isEmpty(departures)) {
      return res.status(200).send({ })
    }

    //Initially sort the response from the nearest departure to furthest.
    departures = sortBy(departures, (departure) => departure.timeToStation)

    forEach(departures, (value) => {
      const { timeToStation, platformName, towards } = value
      let { destinationName } = value

      //If there's no destination name, it will say 'Check Front of Train'
      //This string is pulled from `towards`.
      destinationName = destinationName ? destinationName : towards

      formattedDepartures[platformName] = formattedDepartures[platformName] || { }

      formattedDepartures[platformName][destinationName] = formattedDepartures[platformName][destinationName] || []
      formattedDepartures[platformName][destinationName].push(timeToStation)
    })

    //Ensure a consistency with platform names (Eastbound / Westbound)
    formattedDepartures = sortObjectByKey(formattedDepartures)

    //Further sort all of the destination names for consistency.
    forEach(formattedDepartures, (value, key) => {
      formattedDepartures[key] = sortObjectByKey(formattedDepartures[key])
    })

    return res.status(200).send(formattedDepartures)
  })
}
