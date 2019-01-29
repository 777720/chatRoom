import React from 'react';
import SevenModal from './SevenModal/SevenModal'
import PropTypes from 'prop-types'

  
  
class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '123',
      currentShow: props.show,
      avtorNum: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentShow: nextProps.show
    })
  }

  login = () => {
    const { userName, currentShow, avtorNum } = this.state
    const { loginFn } = this.props
    loginFn(userName, avtorNum)
  }

  onUserNameChange = (e) => {
    this.setState({
      userName: e.target.value
    })
  }

  handleCloseFn = () => {
    this.setState({
      currentShow: false
    })
  }

  handleConfirmFn = () => {
    const { avtorNum, userName } = this.state
    if (avtorNum !== '' && userName !== '') {
      this.login()
      this.setState({
        currentShow: false
      })
    }
  }

  onClickAvtor = (num) => {
    console.log(num);
    this.setState({
      avtorNum: num
    })
  }

  renderChildren = () => {
    const { currentShow, avtorNum } = this.state
    return (
      <div>
        <div>
          <input onChange={this.onUserNameChange} placeholder="请输入昵称" />
        </div>
        <div className="loginmodal">
          <img className={avtorNum == 1 ? 'select-img' : ''} src={require('../asserts/touxiang-01.png')} onClick={() => { this.onClickAvtor(1) }} />
          <img className={avtorNum == 2 ? 'select-img' : ''} src={require('../asserts/touxiang-02.png')} onClick={() => { this.onClickAvtor(2) }} />
          <img className={avtorNum == 3 ? 'select-img' : ''} src={require('../asserts/touxiang-03.png')} onClick={() => { this.onClickAvtor(3) }} />
          <img className={avtorNum == 4 ? 'select-img' : ''} src={require('../asserts/touxiang-04.png')} onClick={() => { this.onClickAvtor(4) }} />
          <img className={avtorNum == 5 ? 'select-img' : ''} src={require('../asserts/touxiang-05.png')} onClick={() => { this.onClickAvtor(5) }} />
        </div>
      </div>
    )
  }
  render() {
    const { currentShow, avtorNum } = this.state
    return (
      <div>
        <SevenModal
          title="登录"
          visible={currentShow}
          onClose={this.handleCloseFn}
          onConfirm={this.handleConfirmFn}
        >
          {this.renderChildren()}
        </SevenModal>
      </div>
    ) 
  }
}
  
  
LoginModal.defaultProps = {}
LoginModal.propTypes = {
  show: PropTypes.bool,
  loginFn: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})
  
  
export default LoginModal