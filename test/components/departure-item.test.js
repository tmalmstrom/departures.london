import React from 'react'
import { shallow } from 'enzyme'
import test from 'ava'

import DepartureItem from '../../assets/js/components/departure-item'

const props = {
  platform: {
    'Liverpool Street': [29, 60, 120]
  },
  index: 'test'
}
const wrapper = shallow(<DepartureItem { ...props } />)

test('should have a title with the station name', t => {
  t.true(wrapper.contains(<h3>Liverpool Street</h3>))
})

test('should render correct time until', t => {
  t.true(wrapper.contains(<p className="departure-item__content">Due</p>))
  t.true(wrapper.contains(<p className="departure-item__content">Arriving</p>))
  t.true(wrapper.contains(<p className="departure-item__content">2min</p>))
})
