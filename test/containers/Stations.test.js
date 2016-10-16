import React from 'react'
import { shallow, mount } from 'enzyme'
import test from 'ava'
import { spy } from 'sinon'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { Stations } from '../../assets/js/containers/Stations'

import { lines } from '../../data/'

const mockStore = configureStore()
const store = mockStore({ })

const props = {
  lines,
  filteredStations: [{ title: 'test', url: '/test' }],
  params: {
    line: 'central'
  },
  title: 'Station 1',
}

const childContextTypes = {
  router: () => { }
}

const context = {
  router: () => { }
}

test('should have a class of index', t => {
})

test('should call getFilteredStations on mount', t => {

})

test('should update stations if appropriate', t => {

})

test('should render isDark', t => {

})

test('should render children if passed in', t => {

})

test('should handle no stations', t => {

})
