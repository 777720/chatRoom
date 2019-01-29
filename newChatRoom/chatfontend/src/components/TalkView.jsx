import React from 'react';
import PropTypes from 'prop-types'

import '../styles/chatRoom.scss'
  
  
class TalkView extends React.Component {

  renderLeft = () => {
    const { userInfo, viewContent } = this.props
    return (
      <div className="chatroom-talkview-container">
        <div className="vantor">
          <img src={require(`../asserts/touxiang-0${userInfo.avtornum}.png`)} />
        </div>
        <div className="rightview">
          <div className="username">{userInfo.username}</div>
          <div className="chat-msg" style={{ backgroundColor: 'grey' }}>{viewContent}</div>
        </div>
      </div>
    )
  }

  renderRight = () => {
    const { userInfo, viewContent } = this.props
    return(
      <div className="chatroom-talkview-container" style={{ justifyContent: 'flex-end' }}>
        <div className="rightview">
          <div className="chat-msg">{viewContent}</div>
        </div>
        <div className="vantor">
          <img src={require(`../asserts/touxiang-0${userInfo.avtornum}.png`)} />
        </div>
      </div>
    )
  }
  render() {
    const { position } = this.props
    return (
      <div>
        { position === 'left' ? this.renderLeft() : this.renderRight() }
      </div>
    )
  }
}
  
  
TalkView.defaultProps = {
  position: 'left' // left right
}
TalkView.propTypes = {
  userInfo: PropTypes.object,
  viewContent: PropTypes.string,
  position: PropTypes.string,
}
  
  
export default TalkView