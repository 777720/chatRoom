import React from 'react';
import PropTypes from 'prop-types'
  
  
class SevenTransition extends React.Component {
  state = {
    modalClasses: '',
    maskClasses: 'test',
    currrentVisable: false,
    renderFlag: true,
  } 



  componentWillReceiveProps(nextProps) {
    const { animation } = nextProps
    if (!animation) {
      return
    }
    if (!nextProps.visible) {
      this.leaveAnimation(nextProps.visible)
    } else {
      if (this.props.visible) {
        return 
      } else {
        this.enterAnimation(nextProps.visible)
      }
    }
  }


  

  enterAnimation(status) {
    const enterClass = 'sevenmodal-enter '
    const enterActiveClass = 'sevenmodal-enter-active'
    const enterEndClass = 'sevenmodal-enter-end'

    const enterMaskClass = 'sevenmodal-mask-enter'
    const activeMaskClass = 'sevenmodal-mask-active'

    const enterClassTime = 100
    const enterActiveTime = 200

    this.setState({
      currrentVisable: status,
      modalClasses: enterClass,
      maskClasses: enterMaskClass
    })

    const enterActiveTimeout = setTimeout(() => {
      this.setState({
        modalClasses: enterActiveClass,
        maskClasses: activeMaskClass
      })
      clearTimeout(enterActiveTimeout)
    }, enterClassTime)

    const endActiveTimeout = setTimeout(() => {
      this.setState({
        modalClasses: enterEndClass
      })
      clearTimeout(endActiveTimeout)
    }, enterActiveTime + enterActiveTime)
    const initTimeout = setTimeout(() => {
      this.setState({
        modalClasses: '',
        maskClasses: '',
      })
      clearTimeout(initTimeout)
    }, enterActiveTime + enterActiveTime + 10)
  }

  leaveAnimation(status) {
    const leaveClass = 'sevenmodal-leave'
    const leaveActiveClass = 'sevenmodal-leave-active'
    const leaveEndClass = 'sevenmodal-leave-end'

    const leaveMaskClass = 'sevenmodal-mask-leave'
    const leaveActiveMaskClass = 'sevenmodal-mask-leaveactive'

    const leaveTime = 10
    const leaveActiveTime = 200
    const leaveEndTime = 100

    this.setState({
      modalClasses: leaveClass,
    })

    const leaveActiveTimeout = setTimeout(() => {
      this.setState({
        modalClasses: leaveActiveClass,
        maskClasses: leaveMaskClass
      })
      clearTimeout(leaveActiveTimeout)
    }, leaveTime)

    const leaveEndActiveTimeout = setTimeout(() => {
      this.setState({
        modalClasses: leaveEndClass,
        maskClasses: leaveActiveMaskClass
      })
    }, leaveTime + leaveActiveTime)

    const initTimeout = setTimeout(() => {
      this.setState({
        modalClasses: '',
        currrentVisable: status,
        maskClasses: ''
      })
      clearTimeout(initTimeout)
    }, leaveTime + leaveActiveTime + leaveEndTime)

  }

  cloneChildren = () => {
    const { children } = this.props
    const { modalClasses, maskClasses } = this.state
    const eleArr = children.map((item, index) => {
      const oldClassname = item.props.className
      if(index === 0) {
        return (
          React.cloneElement(
            item,
            { className: `${oldClassname} ${modalClasses}`, key: index }
          )
        )
      } else if (index === 1) {
        return (
          React.cloneElement(
            item,
            { className: `${oldClassname} ${maskClasses}`, key: index }
          )
        )
      } else {
        return (
          React.cloneElement(
            item,
          )
        )
      }
    })
    return eleArr
  }

  render() {
    const { currrentVisable } = this.state
    return currrentVisable ?  this.cloneChildren() : ''
    
  }
}
  
  
SevenTransition.defaultProps = {
  animation: true,
}
SevenTransition.propTypes = {
  animation: PropTypes.bool,
  visible: PropTypes.bool,
}
  
  
export default SevenTransition