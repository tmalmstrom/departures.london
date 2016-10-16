import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from '../reducers/index'
import { lines, stations, stationsOnLines } from './../../../data/index.min.js'

const initialState = {
  departures: { },
  filteredStations: [],
  lines,
  stations,
  stationsOnLines
}

const middleware = [thunk]

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger'),
        logger = createLogger()

  middleware.push(logger)
}

function configureStore () {
  const store = createStore(
    reducer,
    initialState,
    compose (
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      const nextReducer = require('../reducers/index').default

      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore()
