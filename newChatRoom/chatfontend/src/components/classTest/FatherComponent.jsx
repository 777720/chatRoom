import React from 'react';
import PropTypes from 'prop-types'
  
  
class FatherComponent extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}
  
  
FatherComponent.defaultProps = {}
FatherComponent.propTypes = {}
  
  
export default FatherComponent