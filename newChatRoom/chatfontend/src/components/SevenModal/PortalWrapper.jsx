import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
  
  
class PortalWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.node = document.createElement('div')
    document.body.appendChild(this.node)
  }
  render() {
    const {  children } = this.props;
    return  ReactDOM.createPortal(
      children,
      this.node,
    );

  }
}
  
  
PortalWrapper.defaultProps = {}
PortalWrapper.propTypes = {
  visible: PropTypes.bool,
}
  
  
export default PortalWrapper