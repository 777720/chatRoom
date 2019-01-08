import React from 'react';
import PropTypes from 'prop-types'


class ChatRecordView extends React.Component {

  

  render() {
    const { messageArr } = this.props
    return (
      <div className="border-left border-right record-view">
        <div>聊天记录</div>

        {
          messageArr.map((item, index) => {
            return (
              <div key={index}>
                {item.userName}: {item.message }
              </div>
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