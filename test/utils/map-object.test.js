import test from 'ava'

import mapObject from './../../assets/js/utils/map-object'

const obj = {
  test: 1,
  test2: ['wee', 'too']
}

const arr = ['test', 'test2']

test('should', t => {
  const x = mapObject(obj, (o) => {
    //console.log(o)
    return o
  })

  //console.log(x)
})

test('should return a map of object keys', t => {
  const objectKeysArray = mapObject(obj, (o) => {
    return o
  })

  t.deepEqual(objectKeysArray, arr)
})
