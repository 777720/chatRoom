import React from 'react';
import PropTypes from 'prop-types'
import TalkView from './TalkView'


class ChatRecordView extends React.Component {

  

  render() {
    const { messageArr } = this.props
    const username = window.localStorage.getItem('username')
    console.log('messageArr', messageArr)
    return (
      <div className="border-left border-right record-view">
        <div>聊天记录</div>

        {
          messageArr.map((item, index) => {
            return (
              <TalkView key={index} 
                position={username === item.userName ? 'right' : 'left' }
                userInfo={item}
                viewContent={item.message}
              />
            )
          })
        }
        
      </div>
    )
  }
}

ChatRecordView.defaultProps = {
  messageArr: []
}
ChatRecordView.propTypes = {
  messageArr: PropTypes.arrayOf(PropTypes.any)
}

export default ChatRecordView