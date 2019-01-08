import React from 'react';
import PropTypes from 'prop-types'

class SpeakView extends React.Component {
  state = {
    currentMessage: '',
  }

  onInputChange = (e) => {
    this.setState({
      currentMessage: e.target.value
    })
  }

  onSendMessage = () => {
    const { currentMessage } = this.state
    const { sendMessageFn } = this.props
    if(currentMessage !== '') {
      sendMessageFn(currentMessage)
      this.setState({
        currentMessage: ''
      })
    }
  }
  render() {
    const { currentMessage } = this.state
    return (
      <div className="chatview-speakview">
        <textarea
          onChange={this.onInputChange}
          value={currentMessage}
        />
        <div className="chatview-btn">
          <button className="btn" >关闭</button>
          <button className="btn" onClick={this.onSendMessage}>发送</button>
        </div>
      </div>
    )
  }
}

SpeakView.defaultProps = {}
SpeakView.propTypes = {
  sendMessageFn: PropTypes.func,
}

export default SpeakView