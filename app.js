const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      hbs = require('hbs'),
      compression = require('compression'),
      port = process.env.PORT || 1000,
      isDev = (process.env.NODE_ENV === 'production') ? false : true

let app = express()


const isValidRoute = require('./utils/is-valid-route'),
      API_URL = require('./config/api').API_URL


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(compression())

app.set('views', `${__dirname}/public`)
app.set('view engine', 'hbs')
app.engine('hbs', hbs.__express)
app.use(express.static(path.join(__dirname, 'public')))


app.get(`${ API_URL }/:line/:stationId`, require('./routes/departures'))
app.get(`${ API_URL }/statuses`, require('./routes/statuses'))


app.get('*', (req, res) => {
  if (isValidRoute(req.url)) {
    return res.render('index', { status: 200, isDev })
  } else {
    return res.render('index', { status: 404, isDev })
  }
})


let server = app.listen(port, function () {
  let host = server.address().address,
      port = server.address().port

  console.log('App listening at http://%s:%s', host, port)
})
