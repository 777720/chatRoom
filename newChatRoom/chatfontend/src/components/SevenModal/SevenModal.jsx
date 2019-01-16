import React from 'react';
import PropTypes from 'prop-types'

import PortalWrapper from './PortalWrapper'
import SevenTransition from './SevenTransition'
import './SevenModal.css'
  
  
class SevenModal extends React.Component {
  state = {
    visible: false,
    classes: null,
    maskClasses: null,
  }
  componentDidMount() {
    this.setState({ visible: this.props.visible })
  }

  // 每次接收props就根据父组件的状态更新modal中的visible状态，首次渲染不会调用
  componentWillReceiveProps(props) {

    if(props.visible) {
      this.setState({
        visible: true
      })
    }
  }

  

  closeModal = () => {
    const { onClose } = this.props
    onClose && onClose()
    this.setState({
      visible: false
    })
  }

  confirmModal = () => {
    const { onConfirm } = this.props
    onConfirm && onConfirm()

    this.setState({
      visible: false
    })
    // this.leaveAnimate()
  }


  maskClick() {
    console.log('大家好，我是蒙层，我被点击了')
  }


  render() {
    const { visible, classes } = this.state
    return (
      <PortalWrapper>
        <SevenTransition
          visible={visible}
        >
          <div className={`sevenmodal`}>
            <div className="sevenmodal-title">这是modal标题</div>
            <div className="sevenmodal-content">这是modal内容</div>
            <div className="sevenmodal-operator">
              <button className="sevenmodal-operator-close" onClick={this.closeModal}>取消</button>
              <button className="sevenmodal-operator-confirm" onClick={this.confirmModal}>确认</button>
            </div>

          </div>
          <div className={`sevenmodal-mask`} onClick={this.maskClick}></div>
        </SevenTransition>
      </PortalWrapper> 
    )
  }
}
  
  
SevenModal.defaultProps = {}
SevenModal.propTypes = {
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}
  
  
export default SevenModal