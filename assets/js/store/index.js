import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import reducer from '../reducers/index'
import { lines, stations, stationsOnLines } from './../../../data/index'

const initialState = {
  departures: { },
  filteredStations: [],
  lines,
  stations,
  stationsOnLines
}

function configureStore () {
  const store = createStore(
    reducer,
    initialState,
    compose (
      applyMiddleware(thunk, createLogger()),
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
