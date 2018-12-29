import React from 'react';
import PropTypes from 'prop-types'

class SpeakView extends React.Component {
  render() {
    return (
      <div className="chatview-speakview">
        <textarea />
        <div className="chatview-btn">
          <button className="btn">关闭</button>
          <button className="btn">发送</button>
        </div>
      </div>
    )
  }
}

SpeakView.defaultProps = {}
SpeakView.propTypes = {}

export default SpeakView