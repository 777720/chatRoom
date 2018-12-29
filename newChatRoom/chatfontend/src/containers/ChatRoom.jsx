import React from 'react';
import PropTypes from 'prop-types'
import '../styles/chatRoom.scss'

import LoginUserView from '../components/LoginUsersView'
import ChatRecordView from '../components/ChatRecordView'
import SpeakView from '../components/SpeakView'

class ChatRoom extends React.Component {
  render() {
    return (
      <div className="chatroom-container">
        <div className="chat-header">
          <h3>聊天室</h3>
        </div>
        <div className="chatroom-main">
          <div className="chatview-left">
            <ChatRecordView />
            <SpeakView />
          </div>
          <div className="chatview-right"><LoginUserView /> </div>
        </div>
      </div>
    )
  }
}

ChatRoom.defaultProps = {}
ChatRoom.propTypes = {}

export default ChatRoom