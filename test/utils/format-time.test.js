import test from 'ava'

import formatTime from './../../assets/js/utils/format-time'

test('should state "At Platform" when passed 0', t => {
  t.is(formatTime(0), 'At Platform')
})

test('should state "Due" when passed 31 - 60', t => {
  t.is(formatTime(31), 'Due')
  t.is(formatTime(40), 'Due')
  t.is(formatTime(60), 'Due')
  t.not(formatTime(120), 'Due')
  t.not(formatTime(29), 'Due')
})

test('should state "Arriving" when passed <= 30', t => {
  t.is(formatTime(30), 'Arriving')
  t.is(formatTime(1), 'Arriving')
})

test('should state format string when passed > 60', t => {
  t.is(formatTime(120), '2min')
  t.is(formatTime(600), '10min')
})
