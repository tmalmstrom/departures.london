import React from 'react'
import { shallow } from 'enzyme'
import test from 'ava'

import IndexItem from '../../assets/js/components/index-item'

const props = {
  line: {
    url: 'central',
    title: 'Central',
    status: null,
    color: 'red'
  }
}
const propsDark = Object.assign({}, props, { line: { isDark: true } } )

const wrapper = shallow(<IndexItem { ...props } />)

test('should have 1 link rendered', t => {
  t.is(wrapper.find('Link').length, 1)
  t.true(wrapper.hasClass('index-item'))
})

test('should render passed in props', t => {
  const linkProps = wrapper.find('Link').props()

  t.is(linkProps.to, '/central')
  t.is(linkProps.className, 'index-item')
  t.is(linkProps.style.background, 'red')
})

test('should render isDark', t => {
  const wrapperDark = shallow(<IndexItem { ...propsDark } />)

  t.true(wrapperDark.hasClass('is-dark'))
})
