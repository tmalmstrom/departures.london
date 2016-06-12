import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'

import { Index } from '../../assets/js/containers/Index'

import { lines } from '../../data/'

describe('Container', function () {
  describe('Index', function () {
    it('should have a class of "index"', function () {
      expect(shallow(<Index lines={ lines } />).hasClass('index')).toEqual(true)
    })

    it('should be of type div', function () {
      expect(shallow(<Index lines={ lines } />).type()).toEqual('div')
    })

    it('should have children the same as length of lines array', function () {
      const numOfLines = Object.keys(lines).length,
            wrapper = shallow(<Index lines={ lines } />)

      expect(wrapper.find('IndexItem').length).toEqual(numOfLines)
    })

    it('should have class "has-children" if children are present', function () {
      const wrapper = shallow(
        <Index lines={ lines }>
          <div>I am children</div>
        </Index>
      )

      expect(wrapper.hasClass('has-children')).toEqual(true)
    })
  })
})
