import React from 'react'
import { shallow } from 'enzyme'
import test from 'ava'

import StationItem from '../../assets/js/components/station-item'

const props = {
  bg: 'red',
  line: 'central',
  station: {
    title: 'Bank',
    url: 'bank'
  }
}
const wrapper = shallow(<StationItem { ...props } />)
const children = wrapper.children()
const link = children.find('Link')

test('should have a 1 link with passed in url', t => {
  t.is(link.length, 1)
  t.is(link.prop('to'), '/central/bank')
  t.true(link.contains('Bank'))
})

test('should have a 1 link with the title passed in via props', t => {
  t.true(link.contains('Bank'))
})

test('should have a link with class "station-item"', t => {
  t.is(children.find('Link').prop('className'), 'station-item')
})
