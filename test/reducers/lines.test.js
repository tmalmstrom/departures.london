import test from 'ava'

import reducer from './../../assets/js/reducers/lines'
import * as types from './../../assets/js/constants/index'

const lines = {
  circle: {
    color: 'yellow',
    isDark: false,
  },
  central: {
    color: 'red',
    isDark: true
  }
}

const statuses = {
  central: {
    status: 'Part closure'
  }
}

const mergedLines = {
  circle: {
    color: 'yellow',
    isDark: false,
  },
  central: {
    color: 'red',
    isDark: true,
    status: 'Part closure'
  }
}

test('should have an initial state of empty', t => {
  const state = reducer(undefined, { })

  t.deepEqual(state, {})
})

test('should merge line statuses', t => {
  const state = reducer(lines,
    {
      type: types.LINE_STATUSES_SUCCESS,
      statuses
    }
  )

  t.is(state.central.status, 'Part closure')
  t.deepEqual(state, mergedLines)
})
