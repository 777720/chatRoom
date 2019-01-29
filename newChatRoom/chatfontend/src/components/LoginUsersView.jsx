import React from 'react'
import PropTypes from 'prop-types'

class LoginUserView extends React.Component {
  render() {
    const { users } = this.props
    return (
      <div className="loginuserview">
        在线人员({ users.length })
        <div style={{ paddingLeft: 6 }}>
          {
            users.map((item, index) => {
              return (
                <div className="listitem">
                  <img style={{ width: 22 }} src={require(`../asserts/touxiang-0${item.avtornum}.png`)} />
                  <span>{ item.username }</span>
                </div>
              )
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