import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router'

import fetch from './utils/fetch' // eslint-disable-line

import App from './containers/App.jsx'
import Departures from './containers/Departures.jsx'
import Index from './containers/Index.jsx'
import NotFound from './containers/NotFound.jsx'
import Stations from './containers/Stations.jsx'

import store from './store/index'

render (
   <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Index} />
        <Route path="/" component={ Index }>
          <Route path="/:line" component={ Stations }>
            <Route path="/:line/:station" component={ Departures } />
          </Route>
        </Route>
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
)
