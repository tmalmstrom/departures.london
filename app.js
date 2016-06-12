const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      cors = require('cors'),
      hbs = require('hbs'),
      errorHandler = require('errorhandler'),
      port = process.env.PORT || 8000,
      env = process.env.NODE_ENV || 'DEV'

let app = express()


const isValidRoute = require('./utils/is-valid-route'),
      API_URL = require('./config/api').API_URL


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())

app.set('views', `${__dirname}/public`)
app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.use(express.static(path.join(__dirname, 'public')))


if (env == 'DEV') {
  app.use(errorHandler())
} else {
  app.use(function (err, req, res) {
    console.error(err)
    res.send(500, 'Sorry, there\'s been an error!')
  })
}


app.get(`${ API_URL }/:line/:stationId`, require('./routes/departures'))
app.get(`${ API_URL }/statuses`, require('./routes/statuses'))


app.get('*', (req, res) => {
  if (isValidRoute(req.url)) {
    return res.render('index', { status: 200 } )
  } else {
    return res.render('index', { status: 404 } )
  }
})


let server = app.listen(port, function () {
  let host = server.address().address,
      port = server.address().port

  console.log('App listening at http://%s:%s', host, port)
})
