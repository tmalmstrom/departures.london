const winston = require('winston')


exports.api = new (winston.Logger) ({
  transports: [
    new (winston.transports.File)({ filename: 'api.log' })
  ]
})

exports.error = new (winston.Logger) ({
  transports: [
    new (winston.transports.File)({
      filename: 'error.log',
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ]
})
