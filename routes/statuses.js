const request = require('request'),
      isEmpty = require('lodash/isEmpty'),
      groupBy = require('lodash/groupBy'),
      cache = require('memory-cache')

module.exports = (req, res) => {
  let statuses,
      formattedStatuses = { },
      appId = process.env.APP_ID,
      appKey = process.env.APP_KEY,
      url = `https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground/Status?app_id=${ appId }&app_key=${ appKey }`

  const cachedResponse = cache.get('statuses')

  if (cachedResponse) {
    return res.status(200).send(cachedResponse)
  }

  request(url, (err, response) => {
    try {
      statuses = JSON.parse(response.body)
    } catch (e) {
      console.error(e)
      return res.status(500).send({ error: true, message: 'Internal Server Error' })
    }

    if (statuses.httpStatusCode) {
      return res.status(500).send({ message: statuses.message })
    }

    if (isEmpty(statuses)) {
      return res.status(200).send({ })
    }

    statuses = groupBy(statuses, 'id')

    Object.keys(statuses).map((line) => {
      let lineKey = line,
          status = statuses[line][0]['lineStatuses'][0].statusSeverityDescription

      lineKey = (line === 'london-overground') ? 'overground' : lineKey
      status = (status === 'Good Service') ? null : status

      formattedStatuses[lineKey] =  { status }
    })

    cache.put('statuses', formattedStatuses, 30000)

    return res.status(200).send(formattedStatuses)
  })
}
