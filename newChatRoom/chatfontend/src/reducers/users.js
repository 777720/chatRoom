import _  from 'lodash'
import _c from '../constants'

const reducers = {
  [_c.ADD_USER]: (state, action) => {
    const _state = _.concat([], state)
    _state.push(action.user)
    return _state
  }
}

const users  = (state = [], action) => {
  if (_.has(action.type, reducers)) {
    reducers[action.type](state, action)
  } else {
    return state
  }
}

export default users