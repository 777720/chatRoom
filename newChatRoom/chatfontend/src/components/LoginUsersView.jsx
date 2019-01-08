import React from 'react'
import PropTypes from 'prop-types'

class LoginUserView extends React.Component {
  render() {
    const { users } = this.props
    return (
      <div>
        在线人员({ users.length })
      <div>
        {
          users.map((item, index) => {
            return `${item} `
          })
        }
      </div>
      </div>
    )
  }
}

LoginUserView.defaultProps = {
  users: []
}

LoginUserView.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any)
}


export default LoginUserView