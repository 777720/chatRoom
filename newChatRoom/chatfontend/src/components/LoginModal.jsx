import React from 'react';
import PropTypes from 'prop-types'

  
  
class LoginModal extends React.Component {
  state = {
    userName: '',
  }

  login = () => {
    const { userName } = this.state
    const { loginFn } = this.props
    loginFn(userName)

  }

  onUserNameChange = (e) => {
    this.setState({
      userName: e.target.value
    })
  }

  render() {

    return [
      <div className="popcon" key="popcon-1">
        <div className="pop-content">
          <div style={{ margin: '6px 6px' }}>
            <h2 style={{ margin: '6px 6px' }}>登录</h2>
            <div><input onChange={this.onUserNameChange} placeholder="请输入昵称" /></div>
          </div>
          <div style={{ margin: '6px 6px' }}>
            <button className="login-btn" onClick={this.login}>login</button>
          </div>
        </div>
      </div>,
      <div key="popcon-2" className="popcov-modal"></div>
    ]
  }
}
  
  
LoginModal.defaultProps = {}
LoginModal.propTypes = {
  loginFn: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})
  
  
export default LoginModal