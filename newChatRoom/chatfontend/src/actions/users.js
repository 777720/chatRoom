import _c from '../constants'

export const addUser = (userName) => ({
  type: _c.ADD_USER,
  userName
})