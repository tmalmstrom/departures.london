import test from 'ava'

import reducer from './../../assets/js/reducers/departures'
import * as types from './../../assets/js/constants/index'

test('should have an initial state of empty', t => {
  const state = reducer(undefined, { })

  t.deepEqual(state, {})
})

test('should flag departures as fetching', t => {
  const state = reducer(undefined, { type: types.DEPARTURES_FETCHING })

  t.deepEqual(state, {
    isFetching: true
  })
})

test('should return departures upon success & reset fetching', t => {
  const state = reducer(undefined,
    {
      type: types.DEPARTURES_SUCCESS,
      departures: ['Departure 1']
    }
  )

  t.deepEqual(state, ['Departure 1'])
})

test('should clear the reducer on reset', t => {
  const state = reducer(
    { isFetching: true, departures: ['Departure 1'] },
    { type: types.DEPARTURES_RESET }
  )

  t.deepEqual(state, {})
})
