import React from 'react'
import FatherComponent from './FatherComponent'

class ChildComponent extends React.Component {
  state = {
    num: 1
  }

  onCLickBtn = () => {
    const { num } = this.state
    let numTemp = num;
    this.setState({
      num: ++numTemp
    })
  }
  render() {
    const { num } = this.state
    return (
      <div>
        <FatherComponent>
          <div>
            <button onClick={this.onCLickBtn}>attack</button>
            <div>{ num }</div>
          </div>
        </FatherComponent>
      </div>
    )
  }
}

export default ChildComponent