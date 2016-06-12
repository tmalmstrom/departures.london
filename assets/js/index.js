import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router'

import App from './containers/App'
import Departures from './containers/Departures'
import Index from './containers/Index'
import NotFound from './containers/NotFound'
import Stations from './containers/Stations'

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
