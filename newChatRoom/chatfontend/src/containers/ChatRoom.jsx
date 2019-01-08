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
import SevenModal from '../components/SevenModal/SevenModal'

const socket = require('socket.io-client')('http://localhost:3077');

const store = createStore(rootReducer)
class ChatRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoginModal: true,
      userArrs: [],
      messageArr: [],
      showTestModal: false
    }
  }

  componentDidMount() {


    // this.getUserNameByCache()
    this.socketConfig()

    
  }

  socketConfig = () => {
    socket.on('login', (data) => {
      console.log('login ----->', data)
      this.setState({
        showLoginModal: false,
        userArrs: data
      })
    })
    socket.on('new message', (data) => {
      console.log('new message ------>', data)

      const { messageArr } = this.state
      const userName = window.localStorage.getItem('username')
      const _msgArr = _.concat([], messageArr)

      const msgItem = {
        userName: data.userName,
        message: data.message,
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

 

  handleLoginFn = (username) => {
    socket.emit('add user', username)
    window.localStorage.setItem('username', username)
  }

  handleSendNewMessage = (message) => {
    const userName = window.localStorage.getItem('username')
    socket.emit('new message', { message, userName })
  }

  handleCloseFn = () => {
    this.setState({
      showTestModal: false,
    })
  }

  handleConfirmFn = () => {
    this.setState({
      showTestModal: false,
    })
  }

  render() {
    const { showLoginModal, showTestModal, userArrs, messageArr } = this.state
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
                />
              </div>
              <div className="chatview-right"><LoginUserView users={userArrs} /></div>

              
            </div>

            <button onClick={() => { this.setState({ showTestModal: true }) }}>open test</button>
            {
              // showLoginModal ? <LoginModal loginFn={this.handleLoginFn} /> : ''

              <SevenModal 
                visible={showTestModal} 
                onClose={this.handleCloseFn}
                onConfirm={this.handleConfirmFn}
              />  
            }
          </div>
      </Provider>
    )
  }
}

ChatRoom.defaultProps = {}
ChatRoom.propTypes = {}

export default ChatRoom