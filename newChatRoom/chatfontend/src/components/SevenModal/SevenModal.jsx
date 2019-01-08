import React from 'react';
import PropTypes from 'prop-types'

import PortalWrapper from './PortalWrapper'
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
      this.enterAnimate()
    }
  }

  enterAnimate = () => {
    const enterClasses = "sevenmodal-enter"
    const enterActiverClasses = 'sevenmodal-enter-active'
    const enterEndClasses = 'sevenmodal-enter-end'

    const enterMaskClasses = "sevenmodal-mask-enter"
    const enterActiveClasses = "sevenmodal-mask-active"

    const enterTimeout = 50
    const enterActiveTimeout = 200

    this.setState({
      visible: true, 
      classes: enterClasses,
      maskClasses: enterMaskClasses,
    })

    const enterActiverTimer = setTimeout(() => {
      this.setState({ 
        classes: enterActiverClasses,
        maskClasses: enterActiveClasses 
      }, clearTimeout(enterActiverTimer))
    }, enterTimeout)


    const initTimer = setTimeout(() => {
      this.setState({ classes: '', maskClasses: '' }, clearTimeout(initTimer))
    }, enterTimeout + enterActiveTimeout)
  }

  leaveAnimate = () => {
    const leaveActiverClasses = 'sevenmodal-leave-active'
    const leaveEndClasses = 'sevenmodal-leave-end'

    const leaveMaskClasses = "sevenmodal-mask-leave"
    const leaveMaskActiveClasses = "sevenmodal-mask-leaveactive"

    const leaveTimeout = 0
    const leaveActiveTimeout = 100
    const leaveEndTimeout = 200

    this.setState({
      classes: leaveActiverClasses,
      maskClasses: leaveMaskClasses
    })

    const leaveActiveTimer = setTimeout(() => {
      this.setState({
        classes: leaveEndClasses,
      }, clearTimeout(leaveActiveTimer))
    }, leaveTimeout + leaveActiveTimeout)

    const initTimer = setTimeout(() => {
      this.setState({
        classes: '',
        visible: false
      }, clearTimeout(initTimer))
    }, leaveTimeout + leaveActiveTimeout + 10)


  }

  closeModal = () => {
    const { onClose } = this.props
    onClose && onClose()
    this.leaveAnimate()
  }

  confirmModal = () => {
    const { onConfirm } = this.props
    onConfirm && onConfirm()
    this.leaveAnimate()
  }


  maskClick() {
    console.log('大家好，我是蒙层，我被点击了')
  }


  render() {
    const { visible, classes, maskClasses } = this.state
    console.log('classes', classes, maskClasses);
    return (
      <PortalWrapper>
        <div className="sevenmodal-wrapper">
          {
            visible &&
            <div>
              <div className={`sevenmodal ${classes}`}>
                <div className="sevenmodal-title">这是modal标题</div>
                <div className="sevenmodal-content">这是modal内容</div>
                <div className="sevenmodal-operator">
                  <button className="sevenmodal-operator-close" onClick={this.closeModal}>取消</button>
                  <button className="sevenmodal-operator-confirm" onClick={this.confirmModal}>确认</button>
                </div>

              </div>
              <div className={`sevenmodal-mask ${maskClasses}`} onClick={this.maskClick}></div> 
            </div>
          }
        </div> 
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