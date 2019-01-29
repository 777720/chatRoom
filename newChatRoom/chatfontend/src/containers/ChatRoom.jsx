import React from 'react';
import PropTypes from 'prop-types'
import _  from 'lodash'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import '../styles/chatRoom.scss'
import rootReducer from '../reducers/index'
import LoginUserView from '../components/LoginUsersView'
import ChatRecordView from '../components/ChatRecordView'
import SpeakView from '../components/SpeakView'
import LoginModal from '../components/LoginModal'


import TalkView from '../components/TalkView'


const socket = require('socket.io-client')('http://localhost:3077');

const store = createStore(rootReducer)
class ChatRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: true,
      userArrs: [],
      messageArr: [],
      showTestModal: false,
      loginStatus: false,
    }
  }

  componentDidMount() {
    this.socketConfig()
  }

  socketConfig = () => {
    socket.on('login', (data) => {
      console.log('userArr', data);

      this.setState({
        showLoginModal: false,
        userArrs: data,
        loginStatus: true
      })
    })
    socket.on('new message', (data) => {

      const { messageArr } = this.state
      const userName = window.localStorage.getItem('username')
      const avtornum = window.localStorage.getItem('avtornum')
      const _msgArr = _.concat([], messageArr)

      const msgItem = {
        userName: data.userName,
        message: data.message,
        avtornum: data.avtornum
      }

      _msgArr.push(msgItem)

      this.setState({
        messageArr: _msgArr
      })


    });
  }

  getUserNameByCache = () => {
    const userName = window.localStorage.getItem('username')
    if(!userName) {
      this.setState({
        showLoginModal: false
      })
    } 
  }

 

  handleLoginFn = (username, avtornum) => {
    const userInfo = { username, avtornum }
    socket.emit('add user', userInfo)
    console.log('userInfo',userInfo);
    window.localStorage.setItem('username', userInfo.username)
    window.localStorage.setItem('avtornum', userInfo.avtornum)
  }

  handleSendNewMessage = (message) => {
    const userName = window.localStorage.getItem('username')
    const avtornum = window.localStorage.getItem('avtornum')
    socket.emit('new message', { message, userName, avtornum })
  }

  

  render() {
    const { showLoginModal, showTestModal, userArrs, messageArr, loginStatus } = this.state
    return (
      <Provider store={store}>
        <div className="chatroom-container">
          <div className="chat-header">
            <h3>聊天室</h3>
          </div>
          <div className="chatroom-main">
            <div className="chatview-left">
              <ChatRecordView 
                messageArr={messageArr}
              />
              <SpeakView 
                sendMessageFn={this.handleSendNewMessage}
                canInput={loginStatus}
              />
            </div>
            <div className="chatview-right"><LoginUserView users={userArrs} /></div>

            
          </div>

          <LoginModal show={showLoginModal} loginFn={this.handleLoginFn} /> 

        </div>
      </Provider>
    )
  }
}

ChatRoom.defaultProps = {}
ChatRoom.propTypes = {}

export default ChatRoom