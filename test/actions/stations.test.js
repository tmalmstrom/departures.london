import test from 'ava'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import * as actions from './../../assets/js/actions/stations'
import * as types from './../../assets/js/constants/index'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


const store = mockStore({
  stations: [
    {
      'id': '940GZZLUBNK',
      'title': 'Bank',
    },
    {
      'id': '940GZZLUOS',
      'title': 'Old Street',
    },
    {
      'id': '940GZZLUALD',
      'title': 'Aldgate',
    },
  ],
  stationsOnLines: {
    'central': [
      '940GZZLUBNK'
    ]
  }
})


test('should created a success filtered action', t => {
  const filteredStations = { test: 'test' }
  const expectedAction = {
    type: types.FILTERED_STATIONS_SUCCESS,
    filteredStations
  }

  t.deepEqual(actions.successFilteredStations(filteredStations), expectedAction)
})

test('should sort and filter stations', t => {
  const line = 'central'
  const filteredStations = [
    { 'id': '940GZZLUBNK', 'title': 'Bank' },
  ]
  const expectedActions = [
    { type: types.FILTERED_STATIONS_SUCCESS, filteredStations }
  ]

  store.dispatch(actions.getFilteredSortedStations(line))

  t.deepEqual(store.getActions(), expectedActions)
})
