import  { merge }  from 'lodash'

import { LINE_STATUSES_SUCCESS } from './../constants/index'

export default function (state = { }, action) {
  switch (action.type) {
    case LINE_STATUSES_SUCCESS:
      return merge({}, state, action.statuses)

    default:
      return state
  }
}
