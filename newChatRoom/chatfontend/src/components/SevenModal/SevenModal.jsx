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

      this.setState({
        visible: props.visible
      })
  }

  

  closeModal = () => {
    const { onClose } = this.props
    onClose && onClose()
    // this.setState({
    //   visible: false
    // })
  }

  confirmModal = () => {
    const { onConfirm } = this.props
    onConfirm && onConfirm()

    // this.setState({
    //   visible: false
    // })
  }


  maskClick() {
    console.log('大家好，我是蒙层，我被点击了')
  }


  render() {
    const { visible, classes } = this.state
    const { title, children } = this.props
    return (
      <PortalWrapper>
        <SevenTransition
          visible={visible}
        >
            <div className={`sevenmodal`}>

              <div className="sevenmodal-title">{title}</div>
              <div className="sevenmodal-content">
                {
                  children
                }
              </div>
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
  title: PropTypes.string,
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}
  
  
export default SevenModal