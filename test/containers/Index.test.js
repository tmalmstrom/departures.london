import React from 'react'
import { shallow, mount } from 'enzyme'
import test from 'ava'
import { spy } from 'sinon'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { Index } from '../../assets/js/containers/Index'

import { lines } from '../../data/'

const mockStore = configureStore()
const store = mockStore({ })

test('should have a class of index', t => {
  t.true(shallow(<Index lines={ lines } />).hasClass('index'))
})

test('should have children equal to lines array length', t => {
  const numOfLines = Object.keys(lines).length,
        wrapper = shallow(<Index lines={ lines } />)

  t.is(wrapper.find('IndexItem').length, numOfLines)
})

test('should have class "has-children" if children are present', t => {
  const wrapper = shallow(
    <Index lines={ lines }>
      <div>I am children</div>
    </Index>
  )

  t.true(wrapper.hasClass('has-children'))
})

test('should call line statuses on mount', t => {
  const getLineStatuses = spy()
  const wrapper = mount(
    <Provider store={ store }>
      <Index lines={ lines } actions={{ getLineStatuses }} />
    </Provider>
  )

  t.true(getLineStatuses.called)
})
