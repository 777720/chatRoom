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
    const { canInput } = this.props
    
    return (
      <div className="chatview-speakview">
        { 
          canInput ? 
            <div>
              <textarea
                onChange={this.onInputChange}
                value={currentMessage}
              />
              <div className="chatview-btn">
                <button className="btn" >关闭</button>
                <button className="btn" onClick={this.onSendMessage} disabled={false} >发送</button>
              </div>
            </div> : 'login'
        }
        
      </div>
    )
   
  }
}

SpeakView.defaultProps = {
  canInput: true
}
SpeakView.propTypes = {
  canInput: PropTypes.bool,
  sendMessageFn: PropTypes.func,
}

export default SpeakView